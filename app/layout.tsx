import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Smart URL Shortener",
  description: "Shorten, track, and manage URLs with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
