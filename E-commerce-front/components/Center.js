import React from "react";
import Layout from "./Layout";

const CenterStyle = "flex justify-start items-start px-4 py-2 w-full flex-wrap";

const Center = ({ children }) => {
  return (
    <Layout>
      <main className={`${CenterStyle} `}>{children}</main>
    </Layout>
  );
};

export default Center;
