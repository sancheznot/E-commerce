import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";
import ProfilePic from "@/components/ProfilePic";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between">
        <h4>Hello, {session?.user.name}</h4>
        <div className="flex flex-row-reverse justify-center items-center  bg-gray-500 rounded-3xl ">
          <ProfilePic session={session} />
        </div>
      </div>
    </Layout>
  );
}
