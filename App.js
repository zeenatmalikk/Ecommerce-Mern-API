const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/UserRoute");
const productRoute = require("./Routes/ProductRoute");
const cartRoute = require("./Routes/CartRoute");
const orderRoute = require("./Routes/OrderRouter");
const StripeRoute = require("./Routes/Stripe");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cartRoute", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", StripeRoute);
const DB_connect = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://ecommerce:123456abcd@cluster0.wav1d.mongodb.net/ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
    console.log("Db Connected!!");
  } catch (error) {
    console.log(error);
  }
};
DB_connect();

app.listen(5000, () => console.log("Port connected to 5000!"));
