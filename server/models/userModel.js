const mongoose = require("mongoose");

const AddRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    collection: "RegisterData",
  }
);

const RegData = mongoose.model("AddRegisterSchema", AddRegisterSchema);

module.exports = RegData;
