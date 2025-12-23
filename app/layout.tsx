import ToastProvider from "@/components/ToastProvider";
import { Providers } from "@/components/providers/Providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const calisto = localFont({
    src: "./fonts/CalistoMT.woff2",
    variable: "--font-calisto",
    weight: "400",
  });
  
  export const calistoBold = localFont({
    src: "./fonts/CalisMTBol.woff2",
    variable: "--font-calisto-bold",
    weight: "700",
  });
  
  export const futura = localFont({
    src: "./fonts/FuturaStd-Book.woff2",
    variable: "--font-futura",
    weight: "400",
  });



export const metadata: Metadata = {
    title: "Ambassade de la République de Guinée près les Etats-Unis d'Amérique - Washington DC",
    description:
        "Site officiel de l'Ambassade de la République de Guinée à Washington DC. Informations, services consulaires, démarches administratives, actualités et assistance à la diaspora guinéenne aux États-Unis.",
    keywords:
        "ambassade, guinée, washington dc, États-Unis, services consulaires, démarches, diaspora, visa, passeport, actualités, contacts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                 className={`
                    ${calisto.variable}
                    ${calistoBold.variable}
                    ${futura.variable}
                  `}
            >
                <Providers>
                    {children}
                    <ToastProvider />
                </Providers>
            </body>
        </html>
    );
}
