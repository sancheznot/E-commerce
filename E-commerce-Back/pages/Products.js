import Layout from "@/components/Layout";
import ProfilePic from "@/components/ProfilePic";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data.data);
    });
  }, []);

  return (
    <Layout>
      <div className="flex justify-between">
        <Link
          href={"/products/new"}
          className="bg-gray-300 text-black p-3 px-2 rounded-md">
          Add Product
        </Link>
        <div className="flex flex-row-reverse justify-center items-center  bg-gray-500 rounded-3xl ">
          <ProfilePic session={session} />
        </div>
      </div>
      <div className="tableProducts">
        <table className="basic mt-2">
          <thead>
            <tr className="rounded-xl">
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {products.map((products) => {
              return (
                <tr key={products._id}>
                  <td className="shadow-sm shadow-black drop-shadow-lg rounded-md">
                    {products.name}
                  </td>
                  <td className="shadow-sm shadow-black drop-shadow-lg rounded-md">
                    {/* {products.description} */}
                    <div className="w-96 xs:w-32 h-16 overflow-hidden">
                      <p className="text-gray-500 text-lg truncate overflow-ellipsis">
                        {products.description}
                      </p>
                    </div>
                  </td>
                  <td className="shadow-sm shadow-black drop-shadow-lg rounded-md">
                    {products.price}
                  </td>
                  <td className="btns shadow-sm shadow-black drop-shadow-lg">
                    <Link href={`/products/edit/${products._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        inner
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </Link>
                    <Link href={`/products/delete/${products._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Products;
