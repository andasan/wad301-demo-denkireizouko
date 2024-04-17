"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useFridgeStore } from "@/providers/fridge-store-provider";
import { getRecipeItemsAction } from "@/actions/recipeActions";

const fetchRecipeItems = async () => {
	const items = await getRecipeItemsAction();
	return items;
};

export default function MyRecipes() {
	const { myRecipes, setRecipes } = useFridgeStore((state) => state);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchRecipeItems().then((items) => {
			setRecipes(items);
		});
	}, []);

	return (
		<section className="relative h-full">
			<div className="sticky top-0 p-4">
				<div className="border border-l-transparent border-r-transparent border-t-teal-500 border-b-teal-500 py-4">
					<h1 className="text-lg font-medium">My Recipes</h1>
				</div>

				<div className="mt-4">
					{myRecipes?.map((item) => (
						<Link
							href={`/shopping?id=${item.recipeId}`}
							key={item.id}
							className="flex gap-4 items-center py-4 border-b border-gray-200"
						>
							<div className="relative aspect-square h-12 w-12">
								<Image
									src={item.image}
									alt={item.title}
									priority
									fill
									style={{ objectFit: "cover" }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
							<p className="text-start text-sm font-medium hover:underline">
								{item.title.length > 30
									? `${item.title.slice(0, 40)}...`
									: item.title}
							</p>
						</Link>
					))}

					{myRecipes?.length === 0 && (
						<p className="text-sm text-gray-400">No recipes added</p>
					)}
				</div>
			</div>
		</section>
	);
}
