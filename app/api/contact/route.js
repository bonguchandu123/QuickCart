import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  try {
    const { name, email, message } = await req.json();  // Parse JSON from request body
    console.log('Form data received:', { name, email, message });  // Add this line to log received data

    // Validate the incoming data
    if (!name || !email || !message) {
      console.error('Missing form data');  // Log if any data is missing
      return NextResponse.json({ success: false, message: 'All fields are required.' });
    }

    // Create the transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider (e.g., Gmail, SMTP, etc.)
      auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password or app password
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender address
      to: process.env.CONTACT_EMAIL,  // Receiver address
      subject: 'New Contact Form Submission',
      text: `
        You have a new contact form submission:

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    console.log('Sending email with the following options:', mailOptions); // Log the mailOptions

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);  // Log the successful email info

    // Respond back with a success message
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    // Log the error for debugging
    console.error('Error sending email:', error);
    
    // Return a generic error message for the client
    return NextResponse.json({ success: false, message: 'An error occurred, please try again later.' });
  }
}
