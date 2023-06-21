import Image from "next/image";
import React, { useState } from "react";

const ProfilePic = ({ session }) => {
  const [onMouseover, setOnMouseover] = useState(false);
  const active =
    "text-white px-2 p-1 block cursor-pointer transition duration-100 ease-in-out transform shadow-2xl";
  const inactive = "hidden";

  return (
    <>
      <Image
        onMouseEnter={() => setOnMouseover(true)}
        onMouseLeave={() => setOnMouseover(false)}
        src={session?.user.image}
        alt={session?.user.name}
        width={50}
        height={50}
        className="rounded-full w-50 h-50"
      />
      <h5
        className={onMouseover ? active : inactive}
        onMouseEnter={() => setOnMouseover(true)}
        onMouseLeave={() => setOnMouseover(false)}>
        {session?.user.name}
      </h5>
    </>
  );
};

export default ProfilePic;
