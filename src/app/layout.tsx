import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { type ReactNode } from "react";
import { Navbar } from "@/components/molecules/Navbar";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
	metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
	children,
	modal,
}: {
	children: ReactNode;
	modal: ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<header className="border-b border-b-gray-300 bg-white">
						<Navbar />
					</header>
					<section className="sm:py mx-auto max-w-md justify-center p-6 sm:max-w-2xl sm:py-12 md:max-w-4xl lg:max-w-7xl">
						{children}
					</section>
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
