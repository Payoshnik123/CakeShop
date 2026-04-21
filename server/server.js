const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/cakeshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const orderSchema = new mongoose.Schema({
  paymentId: String,
  orderId: String,
  items: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

app.post("/save-order", async (req, res) => {
  const { paymentId, orderId, cart } = req.body;

  try {
    const newOrder = new Order({
      paymentId,
      orderId,
      items: cart,
    });

    await newOrder.save();

    console.log("Order saved to MongoDB ✅");

    res.json({ status: "success" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving order");
  }
});

// 🔑 Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_Sc97xDVVumDXnF",      
  key_secret: "0vXLAvhGoJBGtp1jSp4ctt9f",    
});

// 👉 Create order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});

// 👉 Save order (for now just log)
app.post("/save-order", (req, res) => {
  const { paymentId, orderId, cart } = req.body;

  console.log("🎉 Order Saved:");
  console.log("Payment ID:", paymentId);
  console.log("Order ID:", orderId);
  console.log("Items:", cart);

  res.json({ status: "success" });
});

// 👉 Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});