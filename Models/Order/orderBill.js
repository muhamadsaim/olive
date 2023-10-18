const mongoose = require("mongoose");

const orderBill = mongoose.Schema({
  TransactionId: {
    type: String,
  },
  InOut: {
    type: String,
  },
  RefinedOil: {
    type: String,
  },
  RawMaterial: {
    type: String,
  },
  Cans: {
    type: String,
  },
  Payment: {
    type: String,
  },
  Reason: {
    type: String,
  },
  AuthorizedBy: {
    type: String,
  },
  Adjusted: {
    type:String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrderBill", orderBill);
