import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
export async function POST(request) {
    try {
        
    const {userId} = getAuth(request)

    const {cartData} = await request.json()

    await connectDB()
    const user = await User.findById(userId)

    user.cartItems = cartData
    user.save()
   return  NextResponse.json({success:true})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})

        
    }
    
}