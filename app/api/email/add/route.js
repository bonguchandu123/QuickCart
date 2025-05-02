import Email from "@/models/Email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Please provide an email",
      });
    }

    // Check if already subscribed
    const alreadySubscribed = await Email.findOne({ email });
    if (alreadySubscribed) {
      return NextResponse.json({
        success: false,
        message: "This email is already subscribed",
      });
    }

    // Create and save new email
    const mail = await Email.create({ email });

    return NextResponse.json({
      success: true,
      message: "You successfully subscribed",
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
