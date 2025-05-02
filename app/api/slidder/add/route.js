
import {v2 as cloudinary} from "cloudinary"
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Slidder from "@/models/Slidder";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export async function POST(request) {
    try {
        const {userId} = getAuth(request)
      
        const isSeller = await authSeller(userId)
        if(!isSeller){
                    return NextResponse.json({success:false,message:"not authorized"})
                }
                const formData = await  request.formData()
    
                const title = formData.get('title')
                const offer = formData.get('offer')
            const buttonText1= formData.get('buttonText1')
            const buttonText2 = formData.get('buttonText2')
            const file= formData.get('imgSrc')
    
            const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
    
    const imgSrc = result.secure_url
    
    await connectDB()
    
    const newSlider = await Slidder.create({
        title,
        offer,
        buttonText1,
        buttonText2,
        imgSrc,
        date:Date.now()
    
    
    })
    
    return NextResponse.json({success:true,message:"uploaded successfully",newSlider})
    
        
    } catch (error) {
       return  NextResponse.json({success:false,message:error.message})
        
    }
   

        


        

    
  

    
    
}