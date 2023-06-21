import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import "tailwindcss/tailwind.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            Not signed in <br />
            <button
              onClick={() => signIn("google")}
              className="bg-white p-2 px-4 rounded-lg">
              Sign in
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-blue-900 w-screen h-full flex">
        <Nav/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4 flex-col">
            {children}
        </div>
      </div>
    </>
  );
}
