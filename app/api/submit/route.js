// app/api/submit/route.js
import axios from 'axios';

export async function POST(req) {
  try {
    const { name, email, age, location } = await req.json();

    // Format your WhatsApp message
    const message = `New Response:\nName: ${name}\nEmail: ${email}\nAge: ${age}\nLocation: ${location}`;
    const whatsappNumber = process.env.WHATSAPP_NUMBER; // Your WhatsApp number

    if (!whatsappNumber) {
      return new Response(JSON.stringify({ status: 'error', message: 'WhatsApp number not configured' }), { status: 500 });
    }

    // Construct the WhatsApp URL
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    // Return the URL for the client to open
    return new Response(JSON.stringify({ status: 'success', url }), { status: 200 });
  } catch (error) {
    console.error('Error creating message URL:', error);
    return new Response(JSON.stringify({ status: 'error', message: 'Failed to create message URL' }), { status: 500 });
  }
}
