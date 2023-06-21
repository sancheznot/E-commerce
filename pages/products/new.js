import Layout from "@/components/Layout";
import ProductsForm from "@/components/ProductsForm";

const NewProduct = () => {
  return (
    <Layout>
      <h1 className="text-2xl">New Product</h1>
      <ProductsForm />
    </Layout>
  );
};

export default NewProduct;
