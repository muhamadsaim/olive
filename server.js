const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const routes = require('./Routes/Routes');
const app = express();
dotenv.config();

const { base_Url } = require('./Config/path');

try {
    mongoose.connect(process.env.db_link, {}).then(console.log("Database Connected"));
} catch (error) {
    console.log("Error in connecting database", error.message);
}
const port = process.env.port || 3001;

app.use(express.json());
const corsOptions = {
    origin: '*', 
    allowedHeaders: 'Content-Type,Authorization,x-userToken',
    methods: 'GET,POST,PUT,DELETE', 
};
  
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/", routes)
app.use(`${base_Url}/auth`, require('./Routes/authRoutes'));
app.use(`${base_Url}/customer`,require('./Routes/customerRoutes'))
app.use(`${base_Url}/order`, require('./Routes/orderRoutes'))
app.use(`${base_Url}/stock`, require('./Routes/stockRoutes'))
app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});