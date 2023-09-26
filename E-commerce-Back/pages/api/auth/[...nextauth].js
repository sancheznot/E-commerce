import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmail = ["sancheznotdev@gmail.com"];
const admin = process.env.ADMIN_EMAIL;

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // database: process.env.MONGODB_URI,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, user, sessionToken }) => {
      
      if (admin.includes(session?.user?.email)) {
        session.isAdmin = true;
        return session;
      } else {
        return false;
      }
    },
  },
};

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, AuthOptions);
  if (!admin.includes(session?.user?.email)) {
    res.status(401).json({
      error: "Unauthorized: You are not authorized to access this page",
    });
    res.end();
    throw "Unauthorized: You are not authorized to access this page";
  } else {
    console.log("is admin");
    return true;
  }
}



export default NextAuth(AuthOptions);
