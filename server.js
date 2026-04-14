const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🌍 CONNECT DATABASE
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("🔥 Live Business Connected"));

// 📦 PRODUCT MODEL
const Product = mongoose.model("Product",{
  name:String,
  price:Number,
  image:String,
  instagram:String
});

// 🛒 ORDER MODEL
const Order = mongoose.model("Order",{
  name:String,
  phone:String,
  items:Array,
  amount:Number,
  date:{type:Date, default:Date.now}
});

// GET PRODUCTS
app.get("/products", async (req,res)=>{
  res.json(await Product.find());
});

// ADD PRODUCT (ADMIN)
app.post("/products", async (req,res)=>{
  const p = new Product(req.body);
  await p.save();
  res.json({msg:"Product Added"});
});

// PLACE ORDER
app.post("/order", async (req,res)=>{
  const o = new Order(req.body);
  await o.save();
  res.json({msg:"Order Saved"});
});

// START
app.listen(5000, ()=>{
  console.log("🚀 LIVE BUSINESS RUNNING");
});