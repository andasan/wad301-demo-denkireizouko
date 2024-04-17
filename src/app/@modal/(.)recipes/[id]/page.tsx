import ImageContainer from "@/components/image-container";
import { getRecipe } from "@/lib/spoonacular";
import { Modal } from "./modal";

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
      <ImageContainer
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={300}
        className="w-full"
      />
      <p>{truncatedSummary}</p>
    </Modal>
  );
}
