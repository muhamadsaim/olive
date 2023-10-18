const express = require("express");
const route = express.Router();

const loginAuth = require("../Controllers/Auth/LoginAuth");
const Signup = require("../Controllers/Auth/Signup");
const forgetPassword = require("../Controllers/Auth/forgetPassword");
const UpdatePassword = require("../Controllers/Auth/UpdatePassword");
const Verify = require("../Controllers/Auth/VerifyPasswordCode");

route.post("/login", loginAuth);
route.post("/signup", Signup);
route.post("/forget-password", forgetPassword)
route.post("/verify-code",Verify)
route.post("/update-password",UpdatePassword)

module.exports = route;
