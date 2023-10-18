const express = require("express");
const route = express.Router();
const Middleware = require("../MiddleWare");
const {  getOrderBill, deleteBill, createBill, addStock } = require("../Controllers/Order/orderBill");

route.get('/order-bills', getOrderBill),
route.delete('/delete-bill/:id', Middleware, deleteBill)
route.post('/add-stock', Middleware, addStock)
route.post('/adjust-stock',Middleware,addStock)

module.exports = route;
