import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProduct,
  DeleteProducts,
  GetProducts,
} from "../../apicalls/products1";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {user} = useSelector((state) => state.users);
  const getData = async () => {
    try {
      const response = await GetProducts(null);
      console.log(response);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id) => {};

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        // return record.seller.name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY HH:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div className="flex gap-5"></div>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-5">
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;
