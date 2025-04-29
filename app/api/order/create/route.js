import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!userId || !address || !items || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Missing user ID, address, or cart items.",
      });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    const totalAmount = amount + Math.floor(amount * 0.02); // add 2% tax

    // Save the order to DB
    const newOrder = await Order.create({
      userId,
      address,
      items,
      amount: totalAmount,
      date: Date.now(),
    });

    // Clear user cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
