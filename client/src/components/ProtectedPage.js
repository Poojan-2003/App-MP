import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";

function ProtectedPage({ children }) {
  const [user, setUser] = React.useState(null);

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

  useEffect(() => {
    validateToken();
  }, []);
  return (
    <div>
      {user && (
        <div>
          
          {/* header */}
          <div className="flex justify-between items-center bg-primary p-5">
            <h1 className="text-2xl text-white"
              // onClick={() => navigate("/")}
            >APP MP</h1>

            <div className="bg-white py-2 px-5 rounded flex-gap-1 items-center">
              <i class="ri-shield-user-line"></i> 
              <span>{user.name}</span>

          </div>
          </div>

          {/* body */}

          <div className="p-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedPage;
