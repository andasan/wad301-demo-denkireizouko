import { getRecipes } from "@/lib/spoonacular";
import type { Recipe } from "@/types";

import Search from "@/components/search";
import Pagination from "./_components/pagination";
import RecipeItem from "./_components/product-item";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const response = await getRecipes({
    query,
    offset: (currentPage - 1) * 20,
    number: 20,
  });

  const totalPages = Math.ceil(response.totalResults / 20);
  const generatedRecipes = response.results as unknown as Recipe[];

  return (
    <>
      <Search searchType="recipe" placeholder="Search Recipes" />
      <div className="flex flex-col">
        <ul className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {generatedRecipes.map((recipe: Recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </ul>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
