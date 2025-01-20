import localFont from "next/font/local";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find your dream rental property",
  keywords: "rental, properties, find rental, find properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
