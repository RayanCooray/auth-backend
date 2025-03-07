import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductCategory, ProductBrand, ProductColor, ProductRating,ProductSize, ProductImage } = req.body;
        const userId = req.user.userId; // Assuming the user ID comes from the JWT token
        const product = new Product({
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductQuantity,
            ProductCategory,
            ProductBrand,
            ProductColor,
            ProductSize,
            ProductRating,
            ProductImage,
        });

        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};