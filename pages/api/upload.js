import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mine from "mime-types";
const BucketName = "next-ecommerce2";

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of files.images) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + BucketName +  "." + ext;
    await client.send(
      new PutObjectCommand({
        Bucket: BucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        contentType: mine.lookup(file.path),
      })
    );
    const link = `https://${BucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  res.json({ success: true, links });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
