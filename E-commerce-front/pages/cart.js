import Center from "@/components/Center";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const cart = () => {
  return (
    <>
      <Header />
      <Center>
        <div className="w-11/12 grid grid-cols-2 lg:grid-cols-none place-items-center auto-rows-max grid-flow-row gap-4 mt-5">
          <div className="grid grid-rows-2 place-items-center bg-gray-300 w-full gap-5 p-5 rounded-lg">
              <h3 className="w-full text-black text-2xl font-bold">Cart</h3>
          </div>
          <div className="grid grid-rows-2 place-items-center bg-gray-300 w-7/12 lg:w-full gap-5 p-5 rounded-lg">
              <h3 className="w-full text-black text-2xl font-bold">Information </h3>
              <button
              className="bg-blue-600 border rounded-lg border-gray-200 hover:bg-blue-700 px-unit-xs  py-unit-xs text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
              <Link href={`#`}>Continue to payment</Link>
            </button>
          </div>
        </div>
      </Center>
    </>
  );
};

export default cart;
