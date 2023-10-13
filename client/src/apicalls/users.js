import axios from "axios";

// register user
export const RegisterUser = async (payload) => {
  try {
    const response = await axios.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login user
export const LoginUser = async (payload) => {
  try {
    const response = await axios.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get current user
export const GetCurrentUser = async () => {
    try {
        const response = await axios.get("/api/users/get-current-user");
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
};