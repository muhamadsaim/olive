const express = require("express");
const route = express.Router();

const {createOrder,getOrder,deleteOrder, updateOrder} =require('../Controllers/Order/index');
const Middleware = require("../MiddleWare");
const { createBill } = require("../Controllers/Order/orderBill");


route.post("/create-order",Middleware, createOrder);
route.get("/all-orders", getOrder);
route.delete('/delete-order/:id',Middleware,deleteOrder);
route.post('/update-order/:id', Middleware, updateOrder);
route.post('/create-order-bill', Middleware, createBill);


module.exports = route;
