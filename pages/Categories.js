import Layout from "@/components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import React from "react";
import { useState, useEffect } from "react";

const Categories = ({ swal }) => {
  const [name, setName] = useState("");
  const [categoriesSaved, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState(null);
  const [editcategory, setEditCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { name, parentCategories };
    if (name === "") return;
    if (parentCategories === "") {
      data.parentCategories = null;
    }
    if (editcategory) {
      await axios.put(`/api/categories`, {
        ...data,
        _id: editcategory._id,
      });

      setEditCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  };
  const deleteCategory = (category) => {
    swal
      .fire({
        title: "Are you sure",
        text: `Do you want to delete this category? ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete this category",
        confirmButtonColor: "#d33",
      })
      .then(async (result) => {
        // when confirmed and promise resolved...
        if (result.isConfirmed) {
          const _id = category._id; // get the id from the category
          await axios.delete(`/api/categories?_id=${_id}`);
          fetchCategories();
        }
      })
      .catch((error) => {
        // when promise rejected...
      });
  };
  const editCategory = async (category) => {
    setEditCategory(category);
    setName(category.name);
    setParentCategories(category.parent?._id);
  };
  return (
    <Layout>
      <h1 className="text-2xl">Categories</h1>
      <label htmlFor="">
        {editcategory
          ? `Edit Category ${editcategory.name}`
          : "Create a new category"}
      </label>
      <form className="flex gap-2" onSubmit={saveCategory}>
        <input
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="bg-green-100 rounded-lg border-gray-500 border p-2"
          onChange={(e) => setParentCategories(e.target.value)}
          value={parentCategories}>
          <option value="">Sub Categories</option>
          {categoriesSaved.map(
            (category) =>
              !category.parent && (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              )
          )}
        </select>
        <button className="btn-primary bg-blue-900" type="submit">
          Save
        </button>
      </form>
      <div className="flex flex-row justify-center items-center">
        <table className="basic mt-4">
          <thead>
            <tr className="bg-gray-300">
              <th>Main Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categoriesSaved.length > 0 &&
              categoriesSaved.map(
                (category) =>
                  !category.parent && (
                    <tr key={category._id} className=" p-1 text-center">
                      <td className=" p-1 flex justify-center ">
                        {category.name}
                      </td>
                      <td className="btns p-1 w-4">
                        <button
                          className="bg-blue-500 text-white text-sm px-2 mr-1 py-1 rounded-md hover:bg-blue-700 hover:text-white inline-flex"
                          onClick={() => editCategory(category)}>
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
                          className="bg-red-500 text-white text-sm px-2 mr-1 py-1 rounded-md hover:bg-red-600 hover:text-white inline-flex">
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
                        </button>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
        <table className="basic mt-4 ml-2">
          <thead>
            <tr className="bg-gray-300">
              <th>Sub Categories Name</th>
              <th>Main Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoriesSaved.length > 0 &&
              categoriesSaved.map(
                (category) =>
                  category.parent && (
                    <tr key={category._id} className=" p-1 text-center">
                      <td className=" p-1 flex justify-center ">
                        {category.name}
                      </td>
                      <td className=" p-1 justify-center ">
                        {category?.parent?.name}
                      </td>
                      <td className="btns p-1 w-4">
                        <button
                          className="bg-blue-500 text-white text-sm px-2 mr-1 py-1 rounded-md hover:bg-blue-700 hover:text-white inline-flex"
                          onClick={() => editCategory(category)}>
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
                          className="bg-red-500 text-white text-sm px-2 mr-1 py-1 rounded-md hover:bg-red-600 hover:text-white inline-flex">
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
                        </button>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => {
  return <Categories swal={swal} />;
});
