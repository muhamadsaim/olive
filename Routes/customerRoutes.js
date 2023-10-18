const express = require("express");
const route = express.Router();

const {
  createCustomer,
  getCustomerData,
  deleteCustomer,
} = require("../Controllers/Customer/index");

const MiddleWare = require("../MiddleWare/index");

route.post("/create-customer", MiddleWare, createCustomer);
route.get("/get-customer", getCustomerData);
route.delete("/delete-customer/:id", MiddleWare, deleteCustomer);

module.exports = route;
