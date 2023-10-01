import Layout from "@/components/Layout";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Settings = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex flex-col">
        <h1>settings</h1>
        <button
          onClick={() => signOut({ session })}
          className="bg-white p-2 px-4 rounded-lg w-24 border border-blue-800">
          Sign out
        </button>
      </div>
    </Layout>
  );
};

export default Settings;
