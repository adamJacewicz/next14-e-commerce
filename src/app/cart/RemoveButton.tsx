"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { removeItem } from "@/app/cart/actions";

export function RemoveButton({ itemId }: { itemId: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			className="hover:text-accent-foregroundinline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<X className="hover:text-red-500" width={18} height={18} />
		</button>
	);
}
