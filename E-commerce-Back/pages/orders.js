import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOtder = async () => {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    };
    getOtder();
  }, []);

  const moveItem = (fromIndex, toIndex) => {
    const updatedTableData = [...orders];
    const [removedItem] = updatedTableData.splice(fromIndex, 1);
    updatedTableData.splice(toIndex, 0, removedItem);
    setOrders(updatedTableData);
  };
  const cancel = "cancel";
  return (
    <Layout>
      <div className="flex flex-col gap-5 mb-10 justify-center items-center">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-2xl uppercase text-white w-full">Orders </h1>
          <h2 className="text-2xl uppercase text-white w-2/12">
            total: ({orders.length})
          </h2>
        </div>
        <table className="shadow-xl shadow-gray-400 bg-gray-200 rounded-2xl w-11/12">
          <thead className="border-b-1 border-gray-300">
            <tr className="text-gray-500 ">
              <th className="p-2">Order ID</th>
              <th>Customer</th>
              <th>Information</th>
              <th>Order Date</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center ">
            {orders.map((order, index) => (
              <>
                <tr key={order.id} className="border-b-3 border-gray-300 ">
                  <td className="p-2">{order._id.slice(18)}</td>
                  <td>{order.name}</td>
                  <td className="">
                    <div className="flex flex-col items-center p-5 w-11/12">
                      <div className="flex items-start w-6/12">
                        {order.email}
                      </div>
                      <div className="flex items-start w-6/12">
                        {" "}
                        {order.phone}
                      </div>
                      <div className="flex items-start w-6/12">
                        {order.country}
                      </div>
                    </div>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="">
                    {order.status === "paid" ? (
                      <>
                        <div className="flex flex-row gap-2 uppercase justify-center items-center text-lg">
                          {order.status}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 text-green-500">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                            />
                          </svg>
                        </div>
                      </>
                    ) : order.status === "pending" ? (
                      <>
                        <div className="flex flex-row gap-2 uppercase justify-center items-center text-lg">
                          {order.status}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 text-yellow-500">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row gap-2 uppercase justify-center items-center text-lg">
                          {order.status}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 text-red-500">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-row gap-x-5 justify-center">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        View
                      </button>
                      <button
                        onClick={() => moveItem(index, index - 1)} // Move item up
                        disabled={index === 0}
                        className="bg-gray-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md">
                        Move Up
                      </button>
                      <button
                        onClick={() => moveItem(index, index + 1)} // Move item down
                        disabled={index === orders.length - 1}
                        className="bg-gray-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md">
                        Move Down
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Orders;
