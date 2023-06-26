import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinners from "@/components/Spinners";
import { ReactSortable } from "react-sortablejs";

const ProductsForm = ({
  _id,
  name: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  subcategory: existingSubCategory,
}) => {
  const [productName, setProductName] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [subCategory, setSubCategory] = useState(existingSubCategory || "");
  const [imagesUpload, setImages] = useState(existingImages || []);
  const [goToProducts, setgoToProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const Router = useRouter();
  const { pathname } = Router;

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);


  const SaveProduct = async (e) => {
    e.preventDefault();
    const data = {
      productName,
      description,
      price,
      images: imagesUpload,
      category,
      subCategory,
    };
    if (data.productName === "") return;
    if (category === "" ) {
      data.category = null;
    }
    if(subCategory === ""){
      data.subCategory = null;
    }
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
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
      setLoading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("images", file, file.name);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setLoading(false);
    }
  };
  const updateImageOrder = (newImages) => {
    setImages(newImages);
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
      <div className="flex flex-col p-2 w-60 rounded-lg">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id=""
          className="p-2 rounded-lg text-gray-500 bg-white border-2 hover:border-blue-600 "
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.length > 0 &&
            categories.map((category) => {
              if (!category.parent) {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              }
            })}
        </select>
      </div>
      <div className="flex flex-col p-2 w-60 rounded-lg">
        <label htmlFor="subcategory">Sub Category</label>
        <select
          name="subcategory"
          id=""
          className="p-2 rounded-lg text-gray-500 bg-white border-2 hover:border-blue-600 "
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select sub Category</option>
          {categories.length > 0 &&
            categories.map((categorys) => {
              const parent = categorys.parent?._id;
              if (category === parent) {
                return (
                  <option key={categorys._id} value={categorys._id}>
                    {categorys.name}
                  </option>
                );
              }
            })}
        </select>
      </div>
      <label htmlFor="images">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={imagesUpload}
          className="mb-2 flex flex-wrap gap-2"
          setList={updateImageOrder}>
          {!!imagesUpload?.length &&
            imagesUpload.map((link) => (
              <div className="h-24" key={link}>
                <img src={link} alt="images" className="imgUpload" />
              </div>
            ))}
        </ReactSortable>
        {loading && (
          <div className="w-32 h-24 p-3 flex items-center">
            <Spinners />
          </div>
        )}
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
        {!imagesUpload?.length && (
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
