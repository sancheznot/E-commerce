import Layout from "@/components/Layout";
import ProductsForm from "@/components/ProductsForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct(req, res) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProductInfo(response.data.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1 className="text-2xl">Edit Product</h1>
      {productInfo && (
        <>
          <ProductsForm {...productInfo} />
         
        </>
      )}
    </Layout>
  );
}
