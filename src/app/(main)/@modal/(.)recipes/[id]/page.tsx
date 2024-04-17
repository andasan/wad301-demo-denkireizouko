import { Modal } from "./modal";
import { getRecipe } from "@/lib/spoonacular";

export default async function RecipeModal({
	params: { id: recipeId },
}: {
	params: { id: string };
}) {
	const recipe = await getRecipe(Number(recipeId));
	const truncatedSummary = `${recipe.summary
		.replace(/<[^>]*>/g, "")
		.slice(0, 200)}...`;
	return (
		<Modal>
			<h1 className="text-2xl font-bold">{recipe.title}</h1>
			<img src={recipe.image} alt={recipe.title} />
			<p>{truncatedSummary}</p>
		</Modal>
	);
}