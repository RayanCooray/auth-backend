import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    ProductName: { type: String, required: true, minLength: 2 },   
    ProductDescription: { type: String, required: true, minLength: 5 },
    ProductPrice: { type: String, required: true, minLength: 2 },
    ProductQuantity: { type: String, required: true, minLength: 2 },
    ProductCategory: { type: String, required: true, minLength: 2 },
    ProductBrand: { type: String, required: true, minLength: 2 },
    ProductColor: { type: String, required: true, minLength: 2 },
    ProductSize: { type: String, required: true, minLength: 2 },
    ProductRating: { type: String, required: true },
    ProductImage: { type: String, optional: true },
}, { timestamps: true });

export const Product = mongoose.model("Product", ProductSchema);
