const orderModel = require("../../Models/Order/index");
const customerModel = require("../../Models/Customer/index");
const { createCustomer } = require("../Customer/index");
const generateCustomerID = require("../../Helper/GenerateId");
const genQr = require("../../Helper/QRCode");

const createOrder = async (req, res) => {
  try {
    const { customerId } = req.body;
    if (customerId) {
      const customer = await customerModel.findOne({ CustomerId: customerId });
      if (!customer) {
        res.json({ success: false, message: "Customer not found" });
      } else {
        const { orderId, customerId, weight, oliveFruit, lineNumber } =
          req.body;
        const formattedLineNumber =
          lineNumber < 10 ? `0${lineNumber}` : lineNumber;
        const newOrder = new orderModel({
          // CustomerId: customerId,
          Customer: customer._id,
          OrderId: orderId,
          Weight: `${weight}kg`,
          OliveType: oliveFruit,
          LineNumber: formattedLineNumber,
          Status: "New",
        });

        const savedOrder = await newOrder.save();
        // genQr(savedOrder)
        res.status(200).json({
          success: true,
          message: "Order created successfully",
        });
      }
    } else {
      // const customerData = req.body.customerData;
      const {
        firstName,
        city,
        nationalId,
        orderId,
        phoneNumber,
        oilProcessed,
        customerType,
        loyaltyProgram,
      } = req.body.customerData;
      const { status, oliveFruit, weight, lineNumber } = req.body.orderData;
      const formattedLineNumber =
        lineNumber < 10 ? `0${lineNumber}` : lineNumber;

      // const customerResponse = await createCustomer({ body: customerData }, res);
      // const customerId = customerResponse.customerId
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
      const customerResponse = await newCustomer.save();

      if (customerResponse) {
        // const customerId = result.customerId;
        // Use the customerId to create the order
        const newOrder = new orderModel({
          Customer: customerResponse._id,
          // CustomerId: customerID,
          OrderId: orderId,
          Weight: `${weight}kg`,
          OliveType: oliveFruit,
          LineNumber: formattedLineNumber,
          Status: "New",
        });

        await newOrder.save();

        res.status(201).json({
          success: true,
          message: "Order created successfully",
        });
      } else {
        // Handle the case where customer creation failed
        res.status(500).json({
          success: false,
          message: "order not created",
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in order controller" });
  }
};

const getOrder = async (req, res) => {
  try {
    // Use Mongoose's aggregate method to join orders with customers
    // const ordersWithCustomers = await orderModel.aggregate([
    //   {
    //     $addFields: {
    //     tempCustomerID:"$Customer"
    //   }
    // },
    //   {
    //     $lookup: {
    //       from: 'customerData',
    //       localField: 'tempCustomerID',
    //       foreignField: '_id',
    //       as: 'customersData'
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       orderId: "$_id",
    //       Customer: 1,
    //       customer: { $arrayElemAt: ["$customerData", 1] },
    //     tempCustomerID:1
    //     }
    //   }
    // ]);

    // const orders = await orderModel.find({}).populate('Customer');
    // console.log(orders)
    // const simplifiedOrders = orders.map(order => ({
    //   ObjId: order._id,
    //   OrderId:order.OrderId,
    //   Farmer: order.Customer.Name,
    //   Phone: order.Customer.Phone,
    //   Weight: order.Weight,
    //   City: order.Customer.City,
    //   OliveType: order.OliveType,
    //   CustomerId: order.Customer.CustomerId,
    //   Line:order.LineNumber,
    //   Status:order.Status
    // }));

    const orders = await orderModel
      .find({})
      .populate({
        path: "Customer", 
        select:"Name Phone City CustomerId"
      });
    const simplifiedOrders = orders.map((order) => ({
      ObjId: order._id,
      OrderId: order.OrderId,
      Farmer: order.Customer.Name,
      Phone: order.Customer.Phone,
      Weight: order.Weight,
      City: order.Customer.City,
      OliveType: order.OliveType,
      CustomerId: order.Customer.CustomerId,
      Line: order.LineNumber,
      Status: order.Status,
    }));

    res.status(200).json({ success: true, data: simplifiedOrders });
  } catch (error) {
    // Handle errors
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found" });
    }
    await orderModel.findByIdAndRemove(orderId);
    res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    console.error("Error in  delete order controller:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { newStatus } = req.body;
    const updatedOrder = await orderModel.findOneAndUpdate(
      { OrderId: orderId },
      { Status: newStatus }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
  updateOrder,
};
