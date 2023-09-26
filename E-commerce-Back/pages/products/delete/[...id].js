import Layout from "@/components/Layout";
import ProductsForm from "@/components/ProductsForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct(req, res) {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProductInfo(response.data.data);
    });
  }, [id]);
  const goBack = () => {
    router.push("/Products");
  };
  const deleteProduct = async () => {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  };

  return (
    <Layout>
      <div
        className={`overflow-auto \
          z-30 \
          h-70 \
          w-70 \
          mx-auto \
          top-20 \
          left-1/3 \
          p-6 \
          border \
          rounded-xl \
          bg-white \
          text-left \
          fixed \
        flex flex-col\
          justify-center \
            items-center `}>
        <h1 className="text-3xl">
          Do you really want to delete &quot;{productInfo?.name}&quot;?
        </h1>
        <div className="flex flex-row">
          <button className="btn-blue bg-blue-400 mr-2 p-1 rounded-md text-white " onClick={deleteProduct}>
            Delete
          </button>
          <button
            onClick={goBack}
            className="btn-red bg-red-700 p-1 rounded-md text-white">
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
}
