import type { FridgeItem, Recipe, ShoppingList } from "@prisma/client";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export type FridgeState = {
  myFridge: FridgeItem[];
  myRecipes: Recipe[];
  myShoppingList: ShoppingList[];
};

export type FridgeActions = {
  addToFridge: (item: FridgeItem) => void;
  removeFromFridge: (item: string) => void;
  setFridge: (items: FridgeItem[]) => void;
  getFridgeItems: () => Promise<FridgeItem[]>;

  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: number) => void;
  setRecipes: (recipes: Recipe[]) => void;

  addShoppingList: (list: ShoppingList[]) => void;
  removeShoppingList: (id: string) => void;
  setShoppingList: (lists: ShoppingList[]) => void;
};

export type FridgeStore = FridgeState & FridgeActions;

export const defaultInitState: FridgeState = {
  myFridge: [],
  myRecipes: [],
  myShoppingList: [],
};

export const createFridgeStore = (
  initState: FridgeState = defaultInitState,
) => {
  return createStore<FridgeStore>()(
    immer((set, get) => ({
      ...initState,

      // Fridge Items
      addToFridge: (item) =>
        set((state) => {
          state.myFridge.push(item);
        }),
      removeFromFridge: (item) =>
        set((state) => {
          state.myFridge = state.myFridge.filter(
            (i: FridgeItem) => i.id !== item,
          );
        }),
      setFridge: (items) =>
        set((state) => {
          state.myFridge = items;
        }),
      getFridgeItems: async () => {
        return get().myFridge;
      },

      // Recipes
      addRecipe: (recipe) =>
        set((state) => {
          state.myRecipes.push(recipe);
        }),
      removeRecipe: (id) =>
        set((state) => {
          state.myRecipes = state.myRecipes.filter(
            (r: Recipe) => r.recipeId !== id,
          );
        }),
      setRecipes: (recipes) =>
        set((state) => {
          state.myRecipes = recipes;
        }),

      // Shopping List
      addShoppingList: (list) =>
        set((state) => {
          state.myShoppingList = [...state.myShoppingList, ...list];
        }),
      removeShoppingList: (id) =>
        set((state) => {
          state.myShoppingList = state.myShoppingList.filter(
            (l: ShoppingList) => l.id !== id,
          );
        }),
      setShoppingList: (lists) =>
        set((state) => {
          state.myShoppingList = lists;
        }),
    })),
  );
};
