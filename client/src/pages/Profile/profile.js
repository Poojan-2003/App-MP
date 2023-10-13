import React from "react";
import { Tabs } from "antd";
import Products from "./Products/products";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Profile() {
  const  navigate  = useNavigate();
  const name = localStorage.getItem("name");
  return (
    <>
      <div className="flex justify-between items-center bg-primary p-5">
        <Link to='/home' className="text-2xl text-white text .no-underline">APP MP</Link>

        <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
          <i className="ri-shield-user-line"></i>
          <span
            className="underline cursor-pointer uppercase"
            onClick={() => navigate("/profile")}
          >
            {name}
          </span>
          <i
            className="ri-logout-box-r-line ml-10"
            onClick={() => {
              localStorage.removeItem("name");
              navigate("/login");
            }}
          ></i>
          {/* <i className="ri-logout-b" */}
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <h1>Bids</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default Profile;
