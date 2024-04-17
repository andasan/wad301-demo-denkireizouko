"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useFridgeStore } from "@/providers/fridge-store-provider";

import { addRecipeItemAction } from "@/actions/recipeActions";
import type { Recipe } from "@/types";
import type { Prisma } from "@prisma/client";

export default function AddRecipeButton({ recipe }: { recipe: Recipe }) {
  const [disabled, setDisabled] = useState(false);
  const { addRecipe, myRecipes } = useFridgeStore((state) => state);
  const { toast } = useToast();

  const handleAddRecipe = (recipe: Recipe) => {
    setDisabled(true);

    const isRecipeInFridge = myRecipes.some(
      (item) => item.recipeId === Number(recipe.id),
    );
    if (isRecipeInFridge) {
      toast({
        title: "Recipe already in fridge",
        description: "You have already added this recipe to your fridge",
        variant: "destructive",
      });
      setDisabled(false);
      return;
    }

    const newRecipeItem: Prisma.RecipeCreateInput = {
      recipeId: Number(recipe.id),
      title: recipe.title,
      image: recipe.image,
      imageType: recipe.imageType,
    };

    addRecipeItemAction(newRecipeItem)
      .then((storedRecipeItem) => {
        addRecipe(storedRecipeItem);

        toast({
          title: "Recipe added to fridge",
          description: "You have successfully added the recipe to your fridge",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Error adding recipe",
          description: "There was an error adding the recipe to your fridge",
          variant: "destructive",
        });
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <>
      <SignedIn>
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleAddRecipe(recipe)}
          className="flex items-center justify-center bg-gray-100 px-5 transition hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-[18px] w-[18px] peer-focus:text-gray-900 " />
        </button>
      </SignedIn>
      <SignedOut>
        <button
          type="button"
          disabled={true}
          onClick={() => handleAddRecipe(recipe)}
          className="flex items-center justify-center bg-gray-100 px-5 transition hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-[18px] w-[18px] peer-focus:text-gray-900 " />
        </button>
      </SignedOut>
    </>
  );
}
