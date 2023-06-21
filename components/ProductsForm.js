import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductsForm = ({
  _id,
  name: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const [productName, setProductName] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []); 
  const [goToProducts, setgoToProducts] = useState(false);
  const Router = useRouter();
  const { pathname } = Router;
  const SaveProduct = async (e) => {
    e.preventDefault();
    const data = { productName, description, price };

    if (_id) {
      // update
      await axios.put(`/api/products`, { ...data, _id: _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setgoToProducts(true);
  };
  if (goToProducts) {
    Router.push("/Products");
  }
  const upLoadImages = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("images", file, file.name);
      } 
      const res = await axios.post("/api/upload", data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      console.log(res.data)
    }
  };
  return (
    <form onSubmit={SaveProduct}>
      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        name="productName"
        id=""
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="images">Photos</label>
      <div className="">
        <label className="w-24 h-24 flex flex-col-reverse text-gray-500 text-sm items-center justify-center rounded-lg bg-slate-200 cursor-pointer">
          Upload
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <input
            type="file"
            name="images"
            id="images"
            className="hidden"
            onChange={upLoadImages}
          />
        </label>
        {!images?.length && (
          <p className="text-sm text-gray-500 py-2">No images uploaded</p>
        )}
      </div>
      <label htmlFor="price">Price (in USD)</label>
      <input
        type="text"
        name="price"
        id=""
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}></input>
      <button type="submit" className="btn-primary bg-blue-900">
        {pathname === "/products/new" ? "Add" : "Save"}
      </button>
    </form>
  );
};

export default ProductsForm;
