import { useRouter } from "next/router";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "./CartContext";

const OneProduct = ({products}) => {
  const id = useRouter().query.id;
  const [oneproduct, setOneProduct] = useState([]);
  const [window, setWindow] = useState(false);

  const { setProductsInCart } = useContext(CartContext);
  const addToCart = () => {
    setProductsInCart((prev) => [...prev, products._id]);
  };

  useEffect(() => {
    setWindow(true);
  }, []);

  const oneProduct = async (id) => {
    const res = await axios.get(`/api/thisproduct/${id}`);
    setOneProduct(res.data);
  };

  useEffect(() => {
    if (id === undefined) {
      if (window) {
        // let idforProduct = localStorage.getItem("idforProduct");
        const idLocal = localStorage.getItem("idforProduct");

        oneProduct(idLocal);
      }
    } else {
      oneProduct(id);
    }
  }, [id, window]);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5">
        <h1 className="text-5xl font-mono ">{oneproduct.name}</h1>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-3">
            {oneproduct.images?.map((image) => {
              return (
                <div className="w-[600px]" key={image}>
                  <Image
                    src={image}
                    width={1000}
                    height={1000}
                    alt={oneproduct.name}
                    className="w-1/4"
                  />
                </div>
              );
            })}
          </div>
          <div className="">
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
          </div>
        </div>
        <div className="">
          <div className="">{oneproduct.description}</div>
        </div>
      </div>
    </Layout>
  );
};

export default OneProduct;
