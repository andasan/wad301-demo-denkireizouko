import type * as recipes from "@andasan/spoonacular-api-clients";

export type GetRecipeInformation =
  recipes.GetRecipeInformationBulk200ResponseInner;
export type ExtendedIngredient =
  recipes.GetRecipeInformation200ResponseExtendedIngredientsInner;
export type ExtendedIngredientOrigin =
  recipes.GetRecipeInformationBulk200ResponseInner["extendedIngredients"];
export type Recipe = recipes.SearchRecipes200ResponseResultsInner;

export type AnalyzedIngredient = {
  id: number;
  name: string;
  localizedName?: string;
  image?: string;
};

export type AnalyzedEquipment = {
  id: number;
  name: string;
  localizedName?: string;
  image?: string;
};
export type AnalyzedInstruction = {
  number: number;
  step: string;
  ingredients?: AnalyzedIngredient[];
  equipment?: AnalyzedEquipment[];
  length?: {
    number: number;
    unit: string;
  };
};

export type CustomRecipes = {
  id: string;
  recipe: GetRecipeInformation;
};
