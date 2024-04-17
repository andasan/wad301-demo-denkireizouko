import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "@/components/header";
import RightSideBar from "@/components/right-aside";
import { Toaster } from "@/components/ui/toaster";
import { FridgeStoreProvider } from "@/providers/fridge-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reizouko App",
  description: "A simple app to manage your fridge",
};

export default function RootLayout({
  children,
  myfridge,
  myrecipes,
  tobuy,
  modal,
}: Readonly<{
  children: React.ReactNode;
  myfridge: React.ReactNode;
  myrecipes: React.ReactNode;
  tobuy: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <FridgeStoreProvider>
            <main className="w-screen min-h-screen flex flex-col">
              <Header />
              <section className="min-h-[calc(100vh_-_6rem)] grid grid-cols-1 md:grid-cols-[300px_minmax(300px,_1fr)_300px]">
                <aside>
                  <SignedIn>{myfridge}</SignedIn>
                </aside>
                {children}
                <aside>
                  <SignedIn>
                    <RightSideBar myrecipes={myrecipes} tobuy={tobuy} />
                  </SignedIn>
                </aside>
              </section>
            </main>
          </FridgeStoreProvider>
          <Toaster />
          {modal}
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
