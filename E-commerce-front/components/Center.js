import React from "react";

const CenterStyle = "flex justify-center items-center px-4 py-2 w-full flex-wrap";



const Center = ({ children }) => {
  return <main className={`${CenterStyle}`}>{children}</main>;
};

export default Center;
