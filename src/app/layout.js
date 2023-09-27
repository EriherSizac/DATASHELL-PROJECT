import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import {AuthProvider} from "@/components/AuthComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Data Shell",
  description: "Mejora tu sistema de adelantos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="https://use.typekit.net/nhf8asm.css" />
        <title>Datashell</title>
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <div className="px-5">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
