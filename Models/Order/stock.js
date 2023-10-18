const mongoose = require("mongoose");

const stockModel = mongoose.Schema({
  TransactionId: {
    type: String,
  },
  InOut: {
    type: String,
  },
  Payment: {
    type: String,
  },
  LinkedOrder: {
    type: String,
  },
  AuthorizedBy: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stock", stockModel);
