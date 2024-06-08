import mongoose from "mongoose";

const cartCollection = "carts";



const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  }
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);