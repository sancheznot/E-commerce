import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { set } from "mongoose";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export const Cart = () => {
  const { productsInCart, addProductToCart, removeProductFromCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [hasWindowLoaded, setHasWindowLoaded] = useState(false);

  useEffect(() => {
    setHasWindowLoaded(true);
    if (productsInCart?.length > 0) {
      axios
        .post("/api/cart/", { ids: productsInCart })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProducts([]);
    }
  }, [productsInCart]);

  const moreOfThisProduct = (id) => {
    addProductToCart(id);
  };
  removeProductFromCart;

  const lessProducts = (id) => {
    removeProductFromCart(id);
  };

  let total = 0;
  for (const productID of productsInCart) {
    const product = products.find((product) => product._id === productID);
    if (product) {
      total += Math.floor(product.price);
    }
  }

  const goToPayment = async () => {
    const res = await axios
      .post("/api/checkout/", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        phone,
        productsInCart,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res?.data?.url) {
      window.location.href = res.data.url;
    }
  };
  if (hasWindowLoaded) {
   
    if (window.location.search.includes("success")) {
      return (
        <>
          <Header />
          <Center>
            <div className="w-6/12 grid grid-cols-1 mt-5">
              <div className=" bg-gray-300 w-full  p-5 rounded-lg shadow-xl">
                <div className="flex flex-col justify-center items-center bg-white rounded-lg h-unit-5xl gap-5">
                  <h3 className="text-black text-5xl font-bold">
                    Thanks for your purchase!
                  </h3>
                  <h5 className="text-2xl">
                    We will send you an email with the details of your order
                  </h5>
                </div>
              </div>
            </div>
          </Center>
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <Center>
        <div className="w-11/12 grid grid-cols-2 lg:grid-cols-none place-items-center gap-4 mt-5">
          <div className="grid grid-rows-1 place-items-center bg-gray-300 w-full gap-3 p-5 rounded-lg ">
            <h3 className="w-full text-black text-2xl font-bold">Cart</h3>
            {!productsInCart?.length && (
              <div className="">
                <h3 className="text-2xl font-bold">Your cart is empty</h3>
              </div>
            )}
            {products?.length > 0 && (
              <div className="grid grid-cols-1 gap-5">
                {products?.map((product) => (
                  <div
                    className="grid grid-cols-3 gap-10 bg-white rounded-lg place-content-center"
                    key={product.name}>
                    <div className="col-span-1 grid place-content-center border-2 border-gray-200 xs:w-full w-7/12 rounded-xl h-[135px] xs:h-[85px] mx-3 my-3">
                      <Image
                        className="object-cover rounded-lg xs:p-2"
                        src={product.images[0]}
                        alt={product.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="col-span-2 xs:grid-cols-1 xs:grid-rows-2 xs:p-2 grid grid-cols-2 h-[150px] w-full place-content-center">
                      <div className="grid grid-rows-2 w-full ">
                        <h3 className="text-2xl xs:text-base font-bold w-full">
                          {product.name}
                        </h3>
                        <div className="w-64 xs:w-32 h-16 overflow-hidden">
                          <p className="text-gray-500 text-lg truncate overflow-ellipsis">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid xs:grid-rows-2 place-content-center xs:place-content-start gap-1">
                        <div className="grid grid-cols-3 gap-2  place-content-center">
                          <button
                            className="w-6 bg-slate-200 rounded-lg text-base font-bold"
                            onClick={() => {
                              lessProducts(product._id);
                            }}>
                            -
                          </button>
                          <div className="bg-gray-200 w-8 h-8 rounded-md flex items-center justify-center ">
                            (
                            {
                              productsInCart.filter((id) => id === product._id)
                                .length
                            }
                            )
                          </div>
                          <button
                            className="w-6 bg-slate-200 rounded-lg text-base font-bold ml-2"
                            onClick={() => {
                              moreOfThisProduct(product._id);
                            }}>
                            +
                          </button>
                        </div>
                        <p className="text-gray-500 text-lg">
                          ${product.price}
                        </p>
                        <div className="bg-gray-100 rounded-md flex items-center justify-center gap-2 text-sm">
                          <i className="text-xs">TOTAL: </i>( $
                          {productsInCart.filter((id) => id === product._id)
                            .length * Math.floor(product.price)}
                          )
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full flex justify-end">
                  <div className="grid place-content-end p-2 bg-white border-2 border-gray-200 xs:w-full w-2/12 rounded-xl h-[60px] xs:h-[85px] mx-3 my-3">
                    <h4>TOTAL: </h4>
                    {total}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-rows-1 place-items-center bg-gray-300 w-7/12 lg:w-full gap-5 p-5 rounded-lg">
            <h3 className="w-full text-black text-2xl font-bold">
              Order Information
            </h3>

            <div className="grid grid-rows-8 gap-3 place-content-center w-8/12">
              <input
                type="text"
                placeholder="Name"
                className="p-2 rounded-md"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="p-2 rounded-md"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2 w-full">
                <input
                  type="text"
                  placeholder="City"
                  className="p-2 rounded-md "
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Postal Code"
                  className="p-2 rounded-md "
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                className="p-2 rounded-md"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                className="p-2 rounded-md"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="phone"
                name="phone"
                id="tfl"
                placeholder="Phone Number"
                className="p-2 rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              onClick={goToPayment}
              className="bg-blue-600 border rounded-lg border-gray-200 hover:bg-blue-700 px-unit-xs  py-unit-xs text-white font-bold cursor-pointer flex flex-row justify-center items-center ">
              Continue to payment
            </button>
          </div>
        </div>
      </Center>
    </>
  );
};
