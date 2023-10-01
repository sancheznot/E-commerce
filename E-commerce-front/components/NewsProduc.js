import React, { useContext, useEffect, useState } from "react";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "./CartContext";

const NewsProduc = ({ products, productsCategories, subcategories }) => {
  const { name, description, price, properties, _id } = products;
  const { name: nameCategori } = productsCategories;
  const [nameSubCategori, setNameSubCategori] = useState([]);

  useEffect(() => {
    subcategories.map((subcategory) => {
      setNameSubCategori(subcategory.name);
    });
  }, []);

  const {setProductsInCart} = useContext(CartContext);
  const addToCart = () => {
    setProductsInCart((prev) => [...prev, products._id]);
  };

  return (
    <Center>
      <div className="grid grid-cols-2 md:grid-cols-1  gap-10 bg-black rounded-md w-full place-items-center ">
        <div className="flex flex-col justify-center w-6/12 lg:w-7/12 xs:w-11/12 gap-3 lg:gap-5">
          <h1x className="text-5xl lg:text-4xl text-white">{name}</h1x>

          <p className="text-gray-400 text-base xs:text-lg text-justify font-black">
            {description}
          </p>
          <div className="grid grid-cols-2 place-items-center auto-rows-max grid-flow-row gap-1 w-full">
            <button
              onClick={addToCart}
              className="bg-blue-600 border gap-2 border-gray-200 hover:bg-blue-700  py-unit-xs rounded-sm w-full text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
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
            <button
              data-te-animation-init
              data-te-animation-start="onHover"
              data-te-animation-reset="true"
              data-te-animation="[slide-right_1s_ease-in-out]"
              className="bg-blue-600 border border-gray-200 hover:bg-blue-700 rounded-sm w-full py-unit-xs text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
              <Link href={`/thisproduct/${_id}`}>Read More</Link>
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-xs text-white">{nameCategori}</p>
            <p className="text-xs text-white">{nameSubCategori}</p>
          </div>
        </div>

        <div className="w-6/12 lg:w-6/12 py-2">
          <Image
            width={860}
            height={500}
            alt="Pro Anywhere"
            src={products.images[0]}
          />
        </div>
      </div>
    </Center>
  );
};

export default NewsProduc;
