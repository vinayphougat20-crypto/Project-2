const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String },
  id: { type: String, required: true },
  price: { type: String, required: true },
});

// exporting model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;