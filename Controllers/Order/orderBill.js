const { transactionID } = require("../../Helper/GenerateId");
const BillModel = require("../../Models/Order/orderBill");
const OrderModel = require("../../Models/Order/index");

const createBill = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      res.status(400).json({ success: false, message: "Order Id Required" });
    } else {
      const { refinedOil, rawMaterial, cans, inOut, payment, authorized } =
        req.body;
      const transactionId = await transactionID(orderId);

      const orderBill = new BillModel({
        RefinedOil: `${refinedOil}Kg`,
        RawMaterial: `${rawMaterial}Kg`,
        Cans: cans,
        InOut: inOut,
        Payment: payment,
        Reason: `linked order ${orderId}`,
        TransactionId: transactionId,
        AuthorizedBy: authorized,
      });

      await orderBill.save();
      res.status(201).json({ success: true, message: "Bill Created" });
    }
  } catch (error) {
    console.log("here is error", error);
    res
      .status(500)
      .json({ success: false, message: "Error in order bill controller" });
  }
};

const addStock = async (req, res) => {
  try {
    const { adjusted } = req.body;
    if (adjusted) {
      const {
        cans,
        payment,
        authorized,
        orderId,
        reason,
        reasonValue,
        adjusted,
      } = req.body;
      const transactionId = await transactionID(orderId);
      if (orderId) {
        const orderExist = await OrderModel.findOne({ OrderId: orderId });
        if (!orderExist) {
          return res
            .status(400)
            .json({ success: false, message: "Order not found" });
        }
        const orderBill = new BillModel({
          Cans: cans,
          InOut: "Out",
          Payment: payment,
          Reason: `Linked ordered ${orderId}`,
          TransactionId: transactionId,
          AuthorizedBy: authorized,
          Adjusted: adjusted,
        });
        await orderBill.save();
        return res
          .status(201)
          .json({ success: true, message: "Stock Adjusted" });
      } else if (reasonValue) {
        const orderBill = new BillModel({
          Cans: cans,
          InOut: "In",
          Payment: payment,
          Reason: reasonValue,
          TransactionId: transactionId,
          AuthorizedBy: authorized,
          Adjusted: adjusted,
        });
        await orderBill.save();
        return res.status(201).json({ success: true, message: "Stock Adjust" });
      } else {
        const orderBill = new BillModel({
          Cans: cans,
          InOut: "Out",
          Payment: payment,
          Reason: reason,
          TransactionId: transactionId,
          AuthorizedBy: authorized,
          Adjusted: adjusted,
        });
        await orderBill.save();
        return res.status(201).json({ success: true, message: "Stock Adjust" });
      }
    } else {
      const { cans, inOut, payment, authorized, orderId } = req.body;
      const transactionId = await transactionID(orderId);
      const orderBill = new BillModel({
        Cans: cans,
        InOut: inOut,
        Payment: payment,
        Reason: orderId,
        TransactionId: transactionId,
        AuthorizedBy: authorized,
      });

      await orderBill.save();
      return res.status(201).json({ success: true, message: "Stock Added" });
    }
  } catch (error) {
    console.log("here is error", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in order bill controller" });
  }
};

const getOrderBill = async (req, res) => {
  try {
    const bill = await BillModel.find({}).select(
      "_id TransactionId InOut Cans  AuthorizedBy Reason Payment"
    );

    if (!bill) {
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteBill = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await BillModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order bill not found" });
    }
    await BillModel.findByIdAndRemove(orderId);
    res
      .status(200)
      .json({ success: true, message: "Stock deleted successfully" });
  } catch (error) {
    console.error("Error in  delete stock controller:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the stock",
    });
  }
};

module.exports = {
  createBill,
  getOrderBill,
  deleteBill,
  addStock,
};
