import React from "react";
import NewsProduc from "./NewsProduc";
import NewProducts from "./NewProducts";
import Layout from "./Layout";

export default function Main ({ products, productsCategories, subcategories ,  newProducts,})  {
  return (
    <>
      <Layout>
      <NewsProduc
        products={products}
        productsCategories={productsCategories}
        subcategories={subcategories}
      />
      <NewProducts newProducts={newProducts} products={products} />
      </Layout>
    </>
  );
};
