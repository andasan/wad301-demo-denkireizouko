import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { FridgeStoreProvider } from "@/providers/fridge-store-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Reizouko App",
	description: "A simple app to manage your fridge",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<FridgeStoreProvider>
						<main className="w-screen min-h-screen flex flex-col">
							<Header />
							{children}
						</main>
					</FridgeStoreProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
