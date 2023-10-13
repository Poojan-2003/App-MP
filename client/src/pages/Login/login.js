import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Login() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const register = async (e) => {
    // dispatch(SetLoader(true))
    await axios
      .post("http://localhost:1337/CheckCred", { email, password })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status === "ok") {
          localStorage.setItem('name',res.data.data);
          // dispatch(SetLoader(false))
          alert("Login Successful");
          navigate("/homepage");
        } else {
          alert("Wrong Credentials");
          // dispatch(SetLoader(false))
        }
      });
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          APPMP - <span className="text-gray-400">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onSubmitCapture={register}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" value={email} required onChange={(e)=>setemail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" value={password} required onChange={(e)=>setpassword(e.target.value)} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
