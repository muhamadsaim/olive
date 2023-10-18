const mongoose = require("mongoose");

const orderModel = mongoose.Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    ref: "customerData",
  },
  OliveType: {
    type: String,
  },
  Weight: {
    type: String,
  },
  OrderId: {
    type: String,
  },
  LineNumber: {
    type: String,
  },
  Status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orderData", orderModel);
