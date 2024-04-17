"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";

export default function Search({
	searchType,
	placeholder,
	className,
	filterFridge,
}: {
	searchType: "recipe" | "ingredient";
	placeholder: string;
	className?: string;
	filterFridge?: (search: string) => void;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		if (searchType === "recipe") {
			const params = new URLSearchParams(searchParams);
			params.set("page", "1");
			if (term) {
				params.set("query", term);
			} else {
				params.delete("query");
			}
			replace(`${pathname}?${params.toString()}`);

			return;
		}

		if (searchType === "ingredient" && filterFridge) {
			filterFridge(term);
			return;
		}
	}, 300);

	return (
		<div className="relative flex flex-shrink-0 ">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className={clsx(
					"peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 h-14",
					className,
				)}
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
			<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
		</div>
	);
}
