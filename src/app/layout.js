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
        <title>Din Express</title>
        <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png"/>
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <div className="px-5 bg-yellow-400">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
