import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import NewProducts from "@/components/NewProducts";
import NewsProduc from "@/components/NewsProduc";
import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";
import { Products } from "@/models/Products";
import React from "react";

export default function index({
  products,
  productsCategories,
  subcategories,
  newProducts,
 
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 ">
        <Main products={products} productsCategories={productsCategories} ubcategories={subcategories}  newProducts={newProducts} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // We difine the id of the product that we want to show
  const idProduct = "6502ab32283243c48e4a244d";
  // We connect to the database with mongoose
  await mongooseConnect();
  // We search the product with the id
  const products = await Products.findById(idProduct);
  // We search the category of the product using the id of the category that we have in the product document
  const productsCategories = await Categories.findById(products?.category);
  // We search the subcategory of the product using the id of the subcategory that we have in the product document from the category document
  const subcategories = await Categories.find({ parent: productsCategories });
  // We return the data to the component
  const newProducts = await Products.find().sort({ updatedAt: -1 }).limit(4);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      productsCategories: JSON.parse(JSON.stringify(productsCategories)),
      subcategories: JSON.parse(JSON.stringify(subcategories)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
