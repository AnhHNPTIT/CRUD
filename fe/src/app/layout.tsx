import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/components/custom/providers";
import React from "react";
import {Header} from "@/components/custom/layout/header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        template: '%s | Q&A Everything',
        default: 'Q&A Everything',
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`flex flex-col ${inter.className}`}>
        <Providers>
            <Header/>
            <main className="flex-1">
                {children}
            </main>
        </Providers>
        </body>
        </html>
    );
}
