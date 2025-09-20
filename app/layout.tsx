import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Consulat Général de Côte d'Ivoire - New York",
    description: "Site officiel du Consulat Général de Côte d'Ivoire à New York. Services consulaires, visa, passeport, et assistance à la diaspora ivoirienne.",
    keywords: "consulat, côte d'ivoire, new york, visa, passeport, diaspora, services consulaires",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <ToastProvider />
            </body>
        </html>
    );
}
