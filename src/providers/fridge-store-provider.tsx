"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { type FridgeStore, createFridgeStore } from "@/store/fridgeStore";

export const FridgeStoreContext = createContext<StoreApi<FridgeStore> | null>(
	null,
);

export interface FridgeStoreProviderProps {
	children: ReactNode;
}

export const FridgeStoreProvider = ({ children }: FridgeStoreProviderProps) => {
	const storeRef = useRef<StoreApi<FridgeStore>>();
	if (!storeRef.current) {
		storeRef.current = createFridgeStore();
	}

	return (
		<FridgeStoreContext.Provider value={storeRef.current}>
			{children}
		</FridgeStoreContext.Provider>
	);
};

export const useFridgeStore = <T,>(selector: (store: FridgeStore) => T): T => {
	const fridgeStoreContext = useContext(FridgeStoreContext);

	if (!fridgeStoreContext) {
		throw new Error("useFridgeStore must be use within FridgeStoreProvider");
	}

	return useStore(fridgeStoreContext, selector);
};
