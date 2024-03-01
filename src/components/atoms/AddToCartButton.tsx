"use client";
import { useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
	disabled: boolean;
};

export function AddToCartButton({ disabled }: AddToCartButtonProps) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
	const { pending } = useFormStatus();

	return (
		<button
			className="px-6"
			disabled={disabled || (pending as boolean)}
			type="submit"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</button>
	);
}
