import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { Recipe } from "@/types";
import AddRecipeButton from "./add-recipe-button";

export default function RecipeItem({
	recipe,
}: {
	recipe: Recipe;
}) {
	return (
		<li className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-gray-200 shadow-xl">
			<div className="relative aspect-square h-[200px] w-full">
				<Image
					className=" bg-gray-100 cursor-pointer"
					alt={recipe.title}
					src={recipe.image}
					priority
					fill
					style={{ objectFit: "cover" }}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
				<Link href={`/recipes/${recipe.id}`}>
					<h3 className="mb-2 text-sm text-gray-600">{recipe.title}</h3>
				</Link>
			</div>
			<div className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
				<Link
					href={`/recipes/${recipe.id}`}
					className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition hover:bg-orange-600 hover:text-white"
				>
					Details
				</Link>
				<AddRecipeButton recipe={recipe} />
			</div>
		</li>
	);
}
