"use client";
import { useOptimistic } from "react";
import { Plus, Minus } from "lucide-react";
import { changeItemQuantity } from "./actions";

export function ChangeQuantity({
	itemId,
	quantity,
	price,
}: {
	itemId: string;
	quantity: number;
	price: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

	async function setQuantity(value: number) {
		if (value <= 0) return;
		setOptimisticQuantity(value);
		await changeItemQuantity({ itemId, quantity: value, total: value * price });
	}

	return (
		<form className="flex items-center gap-2">
			<button
				data-testid="decrement"
				className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				type="submit"
				disabled={optimisticQuantity - 1 <= 0}
				formAction={() => setQuantity(optimisticQuantity - 1)}
			>
				<Minus width={18} height={18} />
			</button>
			<span className="text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<button
				className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				data-testid="increment"
				type="submit"
				formAction={() => setQuantity(optimisticQuantity + 1)}
			>
				<Plus width={18} height={18} />
			</button>
		</form>
	);
}
