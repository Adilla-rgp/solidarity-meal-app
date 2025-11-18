import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { DoadorProvider } from "@/app/contexts/DoadorContext";
import { BeneficiarioProvider } from "@/app/contexts/BeneficiarioContext";
import { AuthProvider } from "./contexts/autenticacaoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prato Solidário",
  description: "Plataforma de doações de aliemntos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Envolvemos toda a aplicação com os dois Providers */}
        <AuthProvider>
          <DoadorProvider>
            <BeneficiarioProvider>
              {children}
            </BeneficiarioProvider>
          </DoadorProvider>
        </AuthProvider>
      </body>
    </html >
  );
} 