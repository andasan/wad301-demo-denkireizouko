"use client";

import { useCallback, useEffect, useState } from "react";

import Search from "@/components/search";
import type { FridgeItem } from "@prisma/client";
import AddToFridgeButton from "./_components/add-to-fridge-button";

import {
	getFridgeItemsAction,
	removeFridgeItemAction,
} from "@/actions/fridgeActions";
import { useFridgeStore } from "@/providers/fridge-store-provider";

const fetchFridgeItems = async () => {
	const items = await getFridgeItemsAction();
	return items;
};

export default function MyFridge() {
	const { myFridge, removeFromFridge, setFridge } = useFridgeStore(
		(state) => state,
	);

	const [filteredFridge, setFilteredFridge] = useState<FridgeItem[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchFridgeItems().then((items) => {
			setFridge(items);
		});
	}, []);

	useEffect(() => {
		setFilteredFridge(myFridge);
	}, [myFridge]);

	const filterFridge = useCallback(
		(search: string) => {
			const filtered = myFridge.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase()),
			);
			setFilteredFridge(filtered);
		},
		[myFridge],
	);

	const handleRemoveFromFridge = async (id: string) => {
		await removeFridgeItemAction(id);
		removeFromFridge(id);
	};

	return (
		<section className="relative h-full">
			<div className="sticky top-0 p-4">
				<div className="border border-l-transparent border-r-transparent border-t-teal-500 border-b-teal-500 py-4">
					<h1 className="mb-2 text-lg font-medium">My Fridge</h1>
					<div className="flex justify-between gap-2">
						<Search
							searchType="ingredient"
							placeholder="Search Fridge"
							className="h-9"
							filterFridge={filterFridge}
						/>
						<AddToFridgeButton />
					</div>
				</div>

				<div className="mt-4">
					{filteredFridge?.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between h-10 py-1 border-b border-gray-200"
						>
							<p className="text-sm font-medium capitalize">{item.name}</p>
							<button
								type="button"
								onClick={() => handleRemoveFromFridge(item.id)}
								className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full hover:bg-green-500 hover:text-white"
							>
								-
							</button>
						</div>
					))}

					{filteredFridge?.length === 0 && (
						<p className="text-sm text-gray-400">No items in the fridge</p>
					)}
				</div>
			</div>
		</section>
	);
}
