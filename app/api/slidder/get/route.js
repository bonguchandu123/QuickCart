import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import Slidder from "@/models/Slidder";
import { NextResponse } from "next/server";


export async function GET(request) {

    try {
        const {userId} = getAuth(request)
      
        const isSeller = await authSeller(userId)
        if(!isSeller){
            return NextResponse.json({success:false,message:"not authorized"})
        }
        const slidders = await Slidder.find({})

        return NextResponse.json({success:true,slidders})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
        
    }
    
}