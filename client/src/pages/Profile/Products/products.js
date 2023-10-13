import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProduct,
  DeleteProducts,
  GetProducts,
} from "../../../apicalls/products1";
import { useNavigate } from "react-router-dom";

function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {user} = useSelector((state) => state.users);
  const getData = async () => {
    try {
      const response = await GetProducts({
        //  seller: user._id,
      });
      console.log(response);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await DeleteProduct(id);
      console.log(response);
      if (response === 200) {
        // setProducts(response.data);
        navigate("/profile");
        getData();
        message.success("Product Deleted Succesfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
        return (
          <div className="flex gap-5">
            <i
              class="ri-delete-bin-line"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
            <i
              class="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
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
      <div className="flex justify-end mb-5">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add products
        </Button>
      </div>

      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Products;
