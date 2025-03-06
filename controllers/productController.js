import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductCategory, ProductBrand, ProductColor, ProductSize, ProductImage } = req.body;
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
            ProductImage,
        });

        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

