"use client";
import { type FormEvent, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query") ?? "";
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		stop?.();
		const formData = new FormData(e.currentTarget);
		const value = formData.get("query")?.toString() ?? "";
		router.push(`/search?query=${value}`);
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		router.push(`/search?query=${value}`);
	}

	const [debouncedOnChange, stop] = useDebounce(onChange, 500);

	return (
		<form role="search" onSubmit={onSubmit}>
			<input
				className="border border-slate-700 flex h-9 w-full rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				onChange={debouncedOnChange}
				type="search"
				role="searchbox"
				name="query"
				defaultValue={query}
				placeholder="Search..."
			/>
		</form>
	);
}
