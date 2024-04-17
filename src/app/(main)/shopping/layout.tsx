import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reizouko App - Shopping Page",
	description: "A simple app to manage your fridge",
};

export default function RecipePageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="flex flex-col p-4">{children}</div>;
}
