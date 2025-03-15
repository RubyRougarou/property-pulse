import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/assets/styles/globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import AuthProvider from "@/app/_components/AuthProvider";
import { UnreadMessagesProvider } from "@/app/_context/UnreadMessagesContext";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find your dream rental property",
  keywords: "rental, properties, find rental, find properties",
};

export default function RootLayout({ children }) {
  return (
    <UnreadMessagesProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer autoClose={3000} position={"top-center"} />
          </body>
        </html>
      </AuthProvider>
    </UnreadMessagesProvider>
  );
}
