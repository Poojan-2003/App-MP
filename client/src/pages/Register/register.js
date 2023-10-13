import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const register = async (e) => {
    await axios
      .post("http://localhost:1337/RegisterData", { name, email, password })
      .then(
        alert("Register Successfull"))
      .then(navigate("/login"));
      
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          MP - <span className="text-gray-400">Register</span>
        </h1>
        <Divider />
        <Form layout="vertical" onSubmitCapture={register}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" value={name} required onChange={(e)=>setname(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" value={email} required onChange={(e)=>setemail(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" required value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
