const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const URI = process.env.DB_URI

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const spareRoutes = require("./routes/spare");
const requestRoutes = require("./routes/partRequests");
const orderRoutes = require('./routes/repairOrders')
const notifRoutes = require('./routes/notifications')

mongoose
  .connect(URI)
  .then(() => {
    console.log("⚡ Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', spareRoutes);
app.use('/api', requestRoutes);
app.use('/api', orderRoutes);
app.use('/api', notifRoutes);

app.listen(port, () => {
  console.log("✅ App is running on port", port);
});