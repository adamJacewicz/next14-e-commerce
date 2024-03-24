"use client";
import { useFormStatus } from "react-dom";

type AddToCartButtonProps = {
	disabled?: boolean;
};

export function AddToCartButton({ disabled = false }: AddToCartButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			disabled={disabled || pending}
			type="submit"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</button>
	);
}
