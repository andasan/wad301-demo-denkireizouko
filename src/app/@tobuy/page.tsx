"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

import {
  getShoppingListAction,
  removeShoppingItemAction,
} from "@/actions/shoppingListActions";
import { useFridgeStore } from "@/providers/fridge-store-provider";

const BASE_IMAGE_URL = "https://img.spoonacular.com/ingredients_100x100";

export default function ToBuy() {
  const { myShoppingList, setShoppingList, removeShoppingList } =
    useFridgeStore((state) => state);

  const fetchShoppingList = useCallback(async () => {
    const items = await getShoppingListAction();
    return items;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchShoppingList().then((items) => {
      setShoppingList(items);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveShoppingItem = async (id: string) => {
    await removeShoppingItemAction(id);
    removeShoppingList(id);
  };

  return (
    <section className="relative h-full">
      <div className="sticky top-0 p-4">
        <div className="border border-l-transparent border-r-transparent border-t-teal-500 border-b-teal-500 py-4">
          <h1 className="text-lg font-medium">Items to Buy</h1>
        </div>

        <div className="mt-4">
          {myShoppingList?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 justify-between items-center h-10 py-1 border-b border-gray-200"
            >
              <Image
                src={`${BASE_IMAGE_URL}/${item.image}`}
                alt={item.name}
                width={50}
                height={50}
                className="object-contain rounded-md h-7 w-7"
              />
              <p className="text-start text-sm font-medium">{item.name}</p>
              <button
                type="button"
                onClick={() => handleRemoveShoppingItem(item.id)}
                className="flex items-center justify-center h-5 w-5 bg-red-100 rounded-full hover:bg-red-500 hover:text-white"
              >
                -
              </button>
            </div>
          ))}

          {myShoppingList?.length === 0 && (
            <p className="text-sm text-gray-400">
              No items in the shopping list
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
