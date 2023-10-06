import { useRouter } from "next/router";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "./CartContext";
import Center from "./Center";

const OneProduct = ({ products }) => {
  const id = useRouter().query.id;
  const [oneproduct, setOneProduct] = useState([]);
  const [imageActive, setImageActive] = useState([]);
  const [window, setWindow] = useState(false);

  const { setProductsInCart } = useContext(CartContext);
  const addToCart = (id) => {
    setProductsInCart((prev) => [...prev, id]);
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

  useEffect(() => {
    if (oneproduct.images) {
      setImageActive(oneproduct.images[0]);
    }
  }, [oneproduct]);

  return (
    <Center>
      <div className="grid grid-cols-1 place-items-center auto-rows-max grid-flow-row bg-black rounded-md w-full min-h-unit-5 p-5">
        <h2 className="text-white text-left w-full text-5xl xs:text-2xl my-4">
          {oneproduct.name}
        </h2>

        <div className="gap-y-3 bg-gray-300 w-11/12 rounded-xl  p-4 ">
          <div
            className="grid sm:grid-cols-2 sm:place-items-center p-2
                       bg-white sm:w-full gap-1 h-auto rounded-lg shadow-none 
                       transition-shadow duration-300 ease-in-out hover:shadow-lg
                       hover:shadow-black/30 w-full">
            <div className="grid grid-cols-2 w-full">
              <div className="grid grid-rows-1 gap-5 place-content-center">
                <div className="w-[300px] h-[400px] flex flex-col justify-center items-center">
                  {oneproduct?.images && (
                    <Image
                      src={imageActive}
                      layout="responsive"
                      width={50} height={50}
                      alt={oneproduct.images}
                      className="w-full h-full rounded-lg"
                    />
                  )}
                </div>
                <div className="grid grid-cols-4 ">
                  {oneproduct?.images?.map((image) => {
                    return (
                      <button
                        key={image}
                        className={
                          imageActive === image
                            ? "border-2 border-blue-500 grid place-content-center cursor-pointer rounded-xl m-5 h-36 transition-all duration-100 ease-in-out hover:shadow-lg"
                            : "grid place-content-center cursor-pointer border border-gray-500 rounded-xl m-5 h-36"
                        }
                        onClick={() => setImageActive(image)}>
                        <Image
                          width={100}
                          height={100}
                          alt={oneproduct.images}
                          src={image}
                          className="h-full max-full rounded-lg"
                        />
                      </button>
                    );
                  })}
                </div>
                  <div className="text-white bg-slate-600 text-center p-3 rounded-md text-xl">
                    $ {oneproduct.price}
                  </div>
              </div>
              <div className="grid grid-rows-1  place-content-center w-full bg-gray-800 rounded-3xl p-3">
                <div className="text-white">{oneproduct.description}</div>
                <div className="">
                  <button
                    onClick={() => addToCart(oneproduct._id)}
                    className="bg-gray-400 border gap-1 border-gray-200 p-2 hover:bg-blue-700  py-unit-xs rounded-xl w-full text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
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
            </div>
          </div>
        </div>
      </div>
    </Center>
  );
};

export default OneProduct;
