const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MongoDB ================= */
mongoose.connect("mongodb://127.0.0.1:27017/cakeshop")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

/* ================= UPLOAD FOLDER ================= */

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Uploads folder created ✅");
}

/* ================= MULTER ================= */

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= STATIC ================= */

app.use("/uploads", express.static(uploadDir));

/* ================= SCHEMAS ================= */

// 👉 Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  img: String,
  category: String,
});
const Product = mongoose.model("Product", productSchema);

// 👉 Order Schema
const orderSchema = new mongoose.Schema({
  userEmail: String,
  paymentId: String,
  orderId: String,
  items: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", orderSchema);

/* ================= RAZORPAY ================= */

const razorpay = new Razorpay({
  key_id: "rzp_test_Sc97xDVVumDXnF",
  key_secret: "0vXLAvhGoJBGtp1jSp4ctt9f",
});

/* ================= ROUTES ================= */

// 👉 TEST upload
app.get("/test-upload", (req, res) => {
  const testFile = path.join(uploadDir, "test.txt");
  fs.writeFileSync(testFile, "working");
  res.send("Upload folder working ✅");
});

/* ===== PRODUCT ROUTES ===== */

// 👉 Get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 👉 Get single product
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch {
    res.status(500).send("Error fetching product");
  }
});

// 👉 Add product with image
app.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image uploaded ❌");
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      img: "/uploads/" + req.file.filename,
    });

    await newProduct.save();

    console.log("Product saved ✅");
    res.json({ message: "Product added ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding product");
  }
});

// 👉 Delete product
app.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

/* ===== PAYMENT + ORDER ROUTES ===== */

// 👉 Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);

  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// 👉 Save order
app.post("/save-order", async (req, res) => {
  try {
    const { paymentId, orderId, cart, userEmail } = req.body;

    const newOrder = new Order({
      userEmail,
      paymentId,
      orderId,
      items: cart,
    });

    await newOrder.save();

    console.log("Order saved ✅");
    res.json({ status: "success" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving order");
  }
});

// 👉 Get user orders
app.get("/orders/:email", async (req, res) => {
  const orders = await Order.find({ userEmail: req.params.email })
    .sort({ createdAt: -1 });

  res.json(orders);
});

// 👉 Admin: get all orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});