import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function HomePage({ children }) {
  const [user, setUser] = React.useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.successs) {
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // useEffect(() => {
  //   validateToken();
  // }, []);
  return (
    <div>
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-2xl text-white">APP MP</h1>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span className="underline cursor-pointer uppercase"
              onClick={() => navigate("/profile")}
            >{name}</span>
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

        {/* body */}
              
        {/* <div className="p-5">{children}</div> */}
      </div>
    </div>
  );
}

export default HomePage;
