import Image from "next/image";

import { getRecipe } from "@/lib/spoonacular";
import type { AnalyzedInstruction } from "@/types";

export default async function RecipeDetailPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const recipe = await getRecipe(Number(id));

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
			<div className="relative w-full h-96">
				<Image
					src={recipe.image}
					alt={recipe.title}
					className="object-cover"
					fill
				/>
			</div>

			<h2 className="border border-transparent border-t-gray-400 mt-4 py-4 text-xl font-semibold">
				Ingredients
			</h2>
			<ul>
				{Array.from(recipe.extendedIngredients).map((ingredient, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={index} className="capitalize list-disc ml-4">
						{ingredient.original}
					</li>
				))}
			</ul>

			<h2 className="border border-transparent border-t-gray-400 mt-4 py-4 text-xl font-semibold">
				Instructions
			</h2>
			<Instructions instructions={recipe.analyzedInstructions[0].steps} />
		</div>
	);
}

function Instructions({
	instructions,
}: {
	instructions: AnalyzedInstruction[];
}) {
	if (!instructions.length) {
		return <p>No instructions available</p>;
	}

	return (
		<ol className="space-y-3">
			{instructions.map((instruction) => (
				<li
					key={instruction.number}
					className="border border-gray-300 p-5 grid grid-cols-[200px_1fr] gap-y-3"
				>
					<h4 className="font-semibold">Step {instruction.number}: </h4>
					<p>{instruction.step}</p>
					{instruction.equipment && instruction.equipment.length > 0 && (
						<>
							<h4 className="font-light">Equipment</h4>
							<ul className="list-disc ml-4 capitalize">
								{instruction.equipment.map((equipment) => (
									<li key={equipment.id}>{equipment.name}</li>
								))}
							</ul>
						</>
					)}

					{instruction.ingredients && instruction.ingredients.length > 0 && (
						<>
							<h4 className="font-light">Ingredients</h4>
							<ul className="list-disc ml-4 capitalize">
								{instruction.ingredients.map((ingredient) => (
									<li key={ingredient.id}>{ingredient.name}</li>
								))}
							</ul>
						</>
					)}

					{instruction.length && (
						<>
							<h4 className="font-light">Length</h4>
							<p>
								{instruction.length.number} {instruction.length.unit}
							</p>
						</>
					)}
				</li>
			))}
		</ol>
	);
}
