import "./globals.css";


export const metadata = {
  title: "WhatsApp Form Response",
  description: "Send form responses to WhatsApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={"w-full"} style={{ height: "100dvh" }}>
      <body className="h-screen gradient-background flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
