import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products1";
// import { SetLoader} from "../../../redux/actions/loaderActions";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Images from "./Images";
// import "./Productforms.css";

const additionalThings = [
  {
    label: "Bill available",
    name: "billavailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyavailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesavailable",
  },
  {
    label: "Box Available",
    name: "boxavailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];
// function call(){
//   message.success("true");
// }

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState();
  // const name = localStorage.getItem("name");
  const onFinish = async (values) => {
    try {
      // dispatch(SetLoader(true));
      let response = null;
      // dispatch(SetLoader(true));
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
        getData();
        navigate("/profile");
        message.success("Product Updated Successfully");
        navigate("/profile");

        setShowProductForm(false);
      } else {
        // values.seller = user._id;
        // values.status = "pending";
        response = await AddProduct(values);

        console.log(response);
        if (response === 200) {
          getData();
          setShowProductForm(false);
          // window.location.reload()
          navigate("/profile");
          message.success("Product Added Succesfully");
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      // dispatch(SetLoader(true));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name.toString()}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked.toString(),
                          });
                        }}
                        checked={formRef.current?.getFieldValue(
                          item.name.toString()
                        )}
                      />
                    </Form.Item>
                  );
                })}
                ;
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <div className="display">
              <Images
                selectedProduct={selectedProduct}
                getData={getData}
                setShowProductForm={setShowProductForm}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
