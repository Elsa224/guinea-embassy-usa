import ToastProvider from "@/components/ToastProvider";
import { Providers } from "@/components/providers/Providers";
import type { Metadata } from "next";
import { Poppins, Inter, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Consulat Général de Côte d'Ivoire - New York",
    description:
        "Site officiel du Consulat Général de Côte d'Ivoire à New York. Services consulaires, visa, passeport, et assistance à la diaspora ivoirienne.",
    keywords:
        "consulat, côte d'ivoire, new york, visa, passeport, diaspora, services consulaires",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={`${roboto.variable}  antialiased`}
            >
                <Providers>
                    {children}
                    <ToastProvider />
                </Providers>
            </body>
        </html>
    );
}
