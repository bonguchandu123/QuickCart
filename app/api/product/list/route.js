
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";


import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        
     await connectDB()
       
        const products = await Product.find({})
        return NextResponse.json({success:true,products})
    } catch (error) {
         NextResponse.json({success:false,message:error.message})
        
    }


}