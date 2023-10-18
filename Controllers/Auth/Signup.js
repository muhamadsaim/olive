const signupModel = require("../../Models/Auth/Signup");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const generateSalt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(req.body.password, generateSalt);
    const registerUser = new signupModel({
      phone: req.body.phone,
      name: req.body.name,
      password: bcryptPassword,
    });

    await registerUser.save();
    console.log("User Added Successfully");
    res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "An error occurred in signup controller" });
  }
};

module.exports = Signup;
