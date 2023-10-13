const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      // required: true,
    },
    billavailable: {
      type: String,
      default: false,
      required: true,
    },
    warrantyavailable: {
      type: String,
      default: false,
      required: true,
    },
    accessoriesavailable: {
      type: String,
      default: false,
      required: true,
    },
    boxavailable: {
      type: String,
      default: false,
      required: true,
    },
    // seller: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   default: "pending",
    // },
  },
  {
    collection: "Productsdata",
  }
);

module.exports = mongoose.model("productSchema", productSchema);