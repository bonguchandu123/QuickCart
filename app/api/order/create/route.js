
import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const {userId} = getAuth(request) 
        const {address,items} = await request.json()
        
        if(!address || !items){
            return NextResponse.json({success:false,message:'Invalid data'})
        }

        // calculate amount using items 
        const amount = await items.reduce(async (acc,item) => {
            const product = await Product.findById(item.product)
            return acc + product.offerPrice*item.quantity
        },0)

        await inngest.send({
            name:'order/created',
            data:{
                userId,
                address,
                items,
                amount:amount + Math.floor(amount *0.02),
                data:Date.now()
            }
        })
        // clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success:true,message:'Order placed '})



        
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
        
    }
    
}