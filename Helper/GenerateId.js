const customerModel = require("../Models/Customer/index");

const generateCustomerID = async () => {
  const currentYear = new Date().getFullYear();

  const latestCustomer = await customerModel.findOne().sort({ _id: -1 });

  let customerCount = 1;

  if (latestCustomer) {
    const latestCustomerNumber = parseInt(
      latestCustomer.CustomerId.split("-")[2]
    );

    if (!isNaN(latestCustomerNumber)) {
      customerCount = latestCustomerNumber + 1;
    }
  }

  const customerID = `arb-${currentYear}-${customerCount
    .toString()
    .padStart(3, "0")}`;

  return customerID;
};

const transactionID = async (orderId) => {
  const currentYear = new Date().getFullYear() - 2000;
  if (orderId === "New Inventory"|| !orderId) {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    const transactionID = `arb-${currentYear}-${randomNumbers}`;
    return transactionID;
  } else {
    const orderIdFormatted = orderId.replace(/-/g, "");
    const transactionID = `arb-${currentYear}-${orderIdFormatted}`;
    return transactionID;
  }
};

module.exports = { generateCustomerID, transactionID };
