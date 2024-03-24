"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";

type SingleProductVariantProps = {
	variants: {
		__typename:
			| "ProductColorVariant"
			| "ProductSizeColorVariant"
			| "ProductSizeVariant";
		id: string;
		name: string;
	}[];
};

export const VariantList = ({ variants }: SingleProductVariantProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	return (
		<select
			value={searchParams.get("variant") || "Size/Color"}
			onChange={(event) =>
				router.push(
					`${pathname}?${createQueryString("variant", event.target.value)}` as Route,
				)
			}
		>
			<option disabled>Size/Color</option>
			{variants.map(({ id, name }) => (
				<option key={id} value={name}>
					{name}
				</option>
			))}
		</select>
	);
};
