import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

import { getManyRecipes } from "@/lib/spoonacular";
import type { GetRecipeInformation } from "@/types";
import { RecipesAccordion } from "./_components/recipes-accordion";

export default async function ShoppingPage() {
  noStore();

  const recipes = await prisma.recipe.findMany();
  const recipeIds = recipes.reduce((acc, recipe) => {
    acc.push(recipe.recipeId);
    return acc;
  }, [] as number[]);
  const response = (await getManyRecipes(
    recipeIds,
  )) as unknown as GetRecipeInformation[];
  const generatedRecipes = Array.from({
    length: recipes.length,
  }).map((_, i) => {
    return {
      id: recipes[i].id,
      recipe: response.find(
        (recipe) => recipe.id === recipes[i].recipeId,
      ) as GetRecipeInformation,
    };
  });

  return (
    <div className="flex flex-col">
      <RecipesAccordion recipes={generatedRecipes} />
    </div>
  );
}
