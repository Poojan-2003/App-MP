const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const RegData = require("./models/userModel");

mongoose
  .connect("mongodb://0.0.0.0:27017/SGP1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB"));

// const port = process.env.PORT || 1337;
const Product = require("./models/productModel");
app.post("/RegisterData", async (req, res) => {
  try {
    const user = await RegData.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    res.json({ status: "Ok" });
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
  } catch (err) {
    console.log(err);
  }
});

app.post("/CheckCred", async (req, res) => {
  const user = await RegData.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", data: user.name });
  } else {
    return res.json({ status: "error" });
  }
});
app.get("/get-current-user", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// const productsRoute = require("./routes/usersRoute");

// app.use("/api/products/add-product", productsRoute);
app.get("/", (req, res) => {
  res.json("HEllo");
});
app.post("/add-product", async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

app.post("/get-product", async (req, res) => {
  const { seller, categories = [], age = [] } = req.body;
  let filters = {};
  if (seller) {
    filters.seller = seller;
  }
  const data = await Product.find(filters).sort({ createdAt: -1 });
  console.log(data);
  return res.send({
    success: true,
    data: data,
  });
});

// edit product

app.put("/edit-product/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete product

app.delete("/delete-product/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



app.listen(1337, () => {
  console.log("Server started on port 1337");
});
