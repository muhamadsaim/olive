const generateCustomerID = require("../../Helper/GenerateId");
const customerModel = require("../../Models/Customer/index");

const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      city,
      nationalId,
      orderId,
      phoneNumber,
      oilProcessed,
      customerType,
      loyaltyProgram,
    } = req.body;
    if (
      !firstName ||
      !city ||
      !orderId ||
      !phoneNumber ||
      !oilProcessed ||
      !customerType
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const customerID = await generateCustomerID();
    const newCustomer = new customerModel({
      Name: firstName,
      City: city,
      NationalId: nationalId || 0,
      OrderId: orderId,
      Phone: phoneNumber,
      OilProcessed: `${oilProcessed}kg`,
      CustomerType: customerType,
      Loyalty: loyaltyProgram,
      CustomerId: customerID,
    });
    await newCustomer.save();
    // return newCustomer.Id
    res.status(201).json({ success: true, message: "customer Added Successfully" });
    // const customerId = newCustomer.Id;
    // console.log('Customer created successfully. Customer ID:', customerId);
  // res.status(201).json({
  //     success: true,
  //     message: "customer Added Successfully",
  //   });
    // Check if customerId is defined
    // if (customerId) {
      // try {
      //  res.status(201).json({
      //    success: true,
      //    message: "customer Added Successfully",
        //  });
        // return customerId
    // res.status(201).json({ success: true, message: "customer Added Successfully" });

    //   } catch (error) {
    //     console.log("Error status",error)
    //   }
    // } else {
    //   console.log('customerId is undefined.');
    //    return res.status(500).json({ success: false, message: "Customer creation error" });
    // }
     
  } catch (error) {
    console.error("Error in customer controller:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred in customer controller",
      });
  }
};

const getCustomerData = async (req, res) => {
  try {
    const customers = await customerModel.find({});
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error("Error in getCustomerData:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred in getCustomerData",
      });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await customerModel.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    await customerModel.findByIdAndRemove(customerId);
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCustomer controller:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while deleting the customer",
      });
  }
};

module.exports = {
  createCustomer,
  getCustomerData,
  deleteCustomer,
};
