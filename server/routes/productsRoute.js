const router = require("express").Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");

// add a new product
// router.post("/products/add-product", authMiddleware, async (req, res) => {
//   try {
//     console.log(req.body);
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.send({
//       success: true,
//       message: "Product added successfully",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// get all products

router.post("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit product

// router.put("/edit-product/:id", authMiddleware, async (req, res) => {
//   try {
//     console.log(req.params.id);
//     await Product.findByIdAndUpdate(req.params.id, req.body);
//     res.send({
//       success: true,
//       message: "Product updated successfully",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//  Get image from PC

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Data.now() + file.originalname);
  },
});

router.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.path.path, {
        folder: "appmp",
      });

      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: {images: result.secure_url}
      });
      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);

module.exports = router;
