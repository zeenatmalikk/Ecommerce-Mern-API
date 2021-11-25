const mongoose = require("mongoose");

const OrderData = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quanityt: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status:{
        type:String,
        default:"pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MernOrder", OrderData);
