import "@/assets/styles/globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find your dream rental property",
  keywords: "rental, properties, find rental, find properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
