import axios from "axios";

// add a new product

export const AddProduct = async (payload) => {
  try {
    console.log(payload);
    const response = await axios.post("http://localhost:1337/add-product", payload);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

// get all products

export const GetProducts = async (filters) => {
  try {
    const response = await axios.post("http://localhost:1337/get-product", filters);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// edit product

export const EditProduct = async (id, payload) => {
  try {
    console.log(id);
    const response = await axios.put(
      `http://localhost:1337/edit-product/${id}`,
      payload
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

// delete product 

export const DeleteProduct = async (id) => { 
  try {
    console.log(id);
    const response = await axios.delete(`http://localhost:1337/delete-product/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

// Upload product image

export const UploadProductImage = async (payload) => {
  try {
    console.log(payload);
    const response = await axios.post(
      "http://localhost:1337/upload-image-to-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}
