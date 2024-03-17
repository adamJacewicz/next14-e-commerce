"use client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
	disabled?: boolean;
};

export function AddToCartButton({ disabled }: AddToCartButtonProps) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
	const { pending } = useFormStatus();

	return (
		<button
			className="px-6 h-9 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
			disabled={disabled || (pending as boolean)}
			type="submit"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</button>
	);
}
