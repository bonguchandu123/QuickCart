import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Parse query parameter from the URL
        const query = new URL(request.url).searchParams.get('query');

        // Ensure a query string is provided
        if (!query) {
            return NextResponse.json({
                success: false,
                message: "Query parameter is required"
            });
        }

        // Search products based on name or description (case-insensitive)
        const filterProduct = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        if (filterProduct.length > 0) {
            return NextResponse.json({
                success: true,
                products: filterProduct // not "filterProduct" in frontend
              });
              
        } else {
            return NextResponse.json({
                success: false,
                message: "No results found"
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}
