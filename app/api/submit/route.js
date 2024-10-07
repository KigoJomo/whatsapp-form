// app/api/submit/route.js

export async function POST(req) {
  try {
    const { name, email, age, location } = await req.json()

    // Format your WhatsApp message
    const message = `*Name:* ${name}\n*Email:* ${email}\n*Age:* ${age}\n*Location:* ${location}`

    const whatsappNumber = process.env.WHATSAPP_NUMBER // Your WhatsApp number

    if (!whatsappNumber) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'WhatsApp number not configured',
        }),
        { status: 500 }
      )
    }

    // Construct the WhatsApp URL using wa.me
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`

    // Return the URL for the client to open
    return new Response(JSON.stringify({ status: 'success', url }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error creating message URL:', error)
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to create message URL',
      }),
      { status: 500 }
    )
  }
}
