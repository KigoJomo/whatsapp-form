// app/api/submit/route.js
import { google } from "googleapis";

export async function POST(req) {
  try {
    // Parse and validate the incoming request
    const { name, email, age, location } = await req.json();
    if (!name || !email || !age || !location) {
      return new Response(
          JSON.stringify({
            status: "error",
            message: "All fields (name, email, age, location) are required.",
          }),
          { status: 400 }
      );
    }

    // Validate environment variables early
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return new Response(
          JSON.stringify({
            status: "error",
            message: "Google Sheets API credentials are not properly configured.",
          }),
          { status: 500 }
      );
    }

    if (!process.env.WHATSAPP_NUMBER) {
      return new Response(
          JSON.stringify({
            status: "error",
            message: "WhatsApp number not configured.",
          }),
          { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append data to Google Sheets
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[name, email, age, location]],
        },
      });
    } catch (sheetError) {
      console.error("Error appending to Google Sheets:", sheetError);
      return new Response(
          JSON.stringify({
            status: "error",
            message: "Failed to append data to Google Sheets.",
          }),
          { status: 500 }
      );
    }

    // Construct WhatsApp URL
    const message = `*Name:* ${name}\n*Email:* ${email}\n*Age:* ${age}\n*Location:* ${location}`;
    const whatsappNumber = process.env.WHATSAPP_NUMBER;

    const url = createWhatsAppUrl(whatsappNumber, message);

    // Return the WhatsApp URL
    return new Response(
        JSON.stringify({
          status: "success",
          url,
        }),
        { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
        JSON.stringify({
          status: "error",
          message: "An error occurred while processing your request.",
        }),
        { status: 500 }
    );
  }
}

// Helper function to generate WhatsApp URL
function createWhatsAppUrl(whatsappNumber, message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
