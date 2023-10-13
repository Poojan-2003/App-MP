import { Button, Upload, message } from "antd";
import React,{ useState } from "react";
import { UploadProductImage } from "../../../apicalls/products1";

function Images({ selectedProduct, setShowProductForm, getData }) {
  // const [SelectedProduct, setSelectedProduct] = React.useState(null);
  // const [products, setProducts] = useState([]);
  const [showPreview = false, setShowPreview] = React.useState(true);
  const [images = [], setImages] = React.useState([selectedProduct.images]);
  const [file = null, setFile] = React.useState(null);

  const upload = async () => {
    try {
      // Uplaod Image to cloudinary
      console.log(setImages);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      // console.log(formData);
      const response = await UploadProductImage(formData);
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <div className="flex gap-5 mb-5">
          {images.map((image) => {
            return (
              <div className="flex gap-2 border border-solid border-gray-300 rounded p-5 items-end">
                <img className="h-20 w-20 object-cover" src={image} alt="" />
                <i
                  className="ri-delete-bin-line"
                  onClick={() => {
                    //  setSelectedProduct(record);
                     setShowProductForm(true);
                  }}
                ></i>
              </div>
            );
          })}
        </div>
        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
