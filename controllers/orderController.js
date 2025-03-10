import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import mongoose from 'mongoose';


export const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, payment, shippingAddress } = req.body;

    if (!user || !products || !totalAmount || !payment || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    console.log("Received products:", products);
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      payment,
      shippingAddress,
      status: "Pending",
    });

    await newOrder.save();

    
    for (const item of products) {
      console.log("Processing product:", item); 

      if (!item.product) {
        return res.status(400).json({ success: false, message: "Product ID is missing in request" });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      }

      
      let currentStock = parseInt(product.ProductQuantity, 10);
      let orderQuantity = parseInt(item.quantity, 10);

      if (currentStock < orderQuantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for: ${product.ProductName}` });
      }

      product.ProductQuantity = currentStock - orderQuantity;
      await product.save();
    }

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};




export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product", "ProductName ProductPrice");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email").populate("products.product", "ProductName ProductPrice");
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.query; 

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};



export const getAllOrdersByUserID = async (req, res) => {
  try {
    const { userId } = req.params;  
    
    const orders = await Order.find({ user: userId })  
      .populate("user", "name email") 
      .populate("products.product", "ProductName ProductPrice");  
    
    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
