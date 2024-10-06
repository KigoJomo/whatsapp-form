# WhatsApp Form Submission

This is a simple Next.js application that allows users to submit their details via a form. Upon submission, a message containing the user's information is sent to a specified WhatsApp number.

## Features

- Collects user details: Name, Email, Age, and Location.
- Sends a formatted message to WhatsApp.
- Opens WhatsApp in a new tab for the user to send the message.

## Prerequisites

- Node.js installed on your machine.
- A WhatsApp account to receive messages.
- An environment variable for your WhatsApp number.

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/KigoJomo/whatsapp-form.git
cd whatsapp-form
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env.local` file in the root of the project and add your WhatsApp number in international format:

```
WHATSAPP_NUMBER=YOUR_WHATSAPP_NUMBER
```

### 4. Run the Application

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Submit the Form

Fill out the form with your details and click "Submit." WhatsApp will open in a new tab with the message prepared for you.

## Code Structure

- **/components/Form.js**: Contains the form component where users input their details.
- **/app/api/submit/route.js**: API route that processes the form submission, constructs the WhatsApp message URL, and returns it to the client.

## Deployment

You can deploy this application on platforms like Vercel for production use. Follow the platform's documentation for deployment instructions.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used for this application.
- [WhatsApp API](https://api.whatsapp.com/) - Used to send messages.