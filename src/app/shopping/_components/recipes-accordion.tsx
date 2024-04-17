"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { removeRecipeItemAction } from "@/actions/recipeActions";
import { addShoppingListAction } from "@/actions/shoppingListActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { useFridgeStore } from "@/providers/fridge-store-provider";
import type {
  CustomRecipes,
  ExtendedIngredient,
  ExtendedIngredientOrigin,
  GetRecipeInformation,
} from "@/types";

export function RecipesAccordion({ recipes }: { recipes: CustomRecipes[] }) {
  const [disabled, setDisabled] = useState(false);
  const { myFridge, myShoppingList, addShoppingList, removeRecipe } =
    useFridgeStore((state) => state);
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openWithParamId = searchParams.get("id");

  const handleAddToShoppingList = async (recipe: GetRecipeInformation) => {
    const ingredients =
      recipe.extendedIngredients as unknown as ExtendedIngredient[];

    const newIngredients = ingredients
      .filter(
        (ingredient, index, self) =>
          index ===
            self.findIndex(
              (t) => t.id === ingredient.id, // Check for duplicate IDs
            ) &&
          !myFridge.some(
            (item) => item.name.toLowerCase() === ingredient.name.toLowerCase(),
          ) &&
          !myShoppingList.some((item) => item.ingredientId === ingredient.id),
      )
      .map((ingredient) => ({
        ingredientId: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        image: ingredient.image,
      }));

    if (newIngredients.length === 0) {
      toast({
        title: "No ingredients to add",
        description: "All ingredients are already in your Shopping List",
        variant: "destructive",
      });
      return;
    }

    const savedShoppingList = await addShoppingListAction(newIngredients);
    addShoppingList(savedShoppingList);

    toast({
      title: "Added to Shopping List",
      description:
        "The missing ingredients have been added to your Shopping List",
      variant: "default",
    });
  };

  const handleRemoveRecipe = async (id: string, recipeId: number) => {
    setDisabled(true);
    await removeRecipeItemAction(id);
    removeRecipe(recipeId);
    setDisabled(false);
    router.replace(pathname);
    router.refresh();
  };

  const handleValueChange = (value: string) => {
    if (value) {
      router.replace(`/shopping?id=${value.split("-")[1]}`);
    } else {
      router.replace(pathname);
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={openWithParamId ? `item-${openWithParamId}` : undefined}
      onValueChange={handleValueChange}
    >
      {recipes.map(({ id, recipe }) => (
        <AccordionItem key={recipe.id} value={`item-${recipe.id}`}>
          <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-gray-100">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-100">
            <div className="flex flex-col xl:flex-row gap-3 mb-5 pb-5 border border-transparent border-b-gray-300">
              <Image
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-md"
                width={400}
                height={400}
              />
              <p
                className="text-lg"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                  __html: recipe.summary,
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ExtendedIngredients ingredients={recipe.extendedIngredients} />
            </div>
            <div className="flex justify-end mt-10 space-x-3">
              <Link
                href={`/shopping/${recipe.id}`}
                className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
              >
                View Recipe
              </Link>
              <button
                type="button"
                onClick={() => handleAddToShoppingList(recipe)}
                className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Add missing ingredients to Shopping List
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleRemoveRecipe(id, recipe.id)}
                className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-gray-500 disabled:hover:bg-red-300 disabled:hover:text-gray-500"
              >
                Remove Recipe
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ExtendedIngredients({
  ingredients,
}: {
  ingredients: ExtendedIngredientOrigin;
}) {
  const myFridge = useFridgeStore((state) => state.myFridge);

  const generatedIngredients = ingredients as unknown as ExtendedIngredient[];
  const uniqueIngredients = generatedIngredients.filter(
    (ingredient, index, self) =>
      index === self.findIndex((t) => t.id === ingredient.id),
  );
  return uniqueIngredients.map((ingredient) => {
    return (
      <div key={ingredient.id} className="flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 mr-2"
          defaultChecked={myFridge.some(
            (item) => item.name.toLowerCase() === ingredient.name.toLowerCase(),
          )}
        />
        <p className="capitalize">
          <span className="font-semibold">{ingredient.name}</span> (
          {ingredient.original})
        </p>
      </div>
    );
  });
}
