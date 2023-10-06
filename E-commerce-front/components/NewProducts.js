import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const NewProducts = ({ newProducts, products }) => {

 
  const { setProductsInCart } = useContext(CartContext);
  const addToCart = (id) => {
    setProductsInCart((prev) => [...prev, id]);
  };


  return (
    <>
      <div className="grid grid-cols-1  gap-1 place-items-center auto-rows-max grid-flow-row bg-black rounded-md w-full min-h-unit-5 ">
        <h2 className="text-white text-left w-full text-2xl my-4">
          New Products 
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 sm:w-full gap-y-3 bg-gray-300 w-11/12 rounded-xl  place-items-center mb-5 p-2 ">
          {newProducts?.length > 0 &&
            newProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="grid sm:grid-cols-2 sm:place-items-center p-2 bg-white sm:w-full gap-1 h-auto max-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                  <Link href={`/thisproduct/${product._id}`} key={product.id}>
                    <div className="w-[150px] h-[150px]">
                      <Image
                        width={150}
                        height={150}
                        alt={product.name}
                        src={product.images[1]}
                        className="h-full max-full rounded-lg "
                      />
                    </div>
                    <div className="grid mdd:grid-flow-col-dense sm:grid-rows-2 gap-2">
                      <h4 className="text-xs text-gray-500">{product.name}</h4>
                      <h4 className="text-xs text-gray-500">{product.price}</h4>
                    </div>
                  </Link>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-gray-400 border gap-1 border-gray-200 hover:bg-blue-700  py-unit-xs rounded-xl w-full text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <Link href="/#">Add to cart</Link>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NewProducts;
