import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/service/cart.service";
import { formatMoney } from "@/lib/utils";
import { handlePaymentAction } from "@/app/cart/actions";
import { CartProduct } from "@/components/molecules/CartProduct";
import { EmptyCartPage } from "@/components/molecules/EmptyCartPage";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	if (!cart.orderItems.length) return <EmptyCartPage />;

	const total = cart.orderItems.reduce(
		(acc, item) => acc + item.quantity * (item.product?.price ?? 0),
		0,
	);
	return (
		<section className="mx-auto w-full max-w-3xl">
			<ul>
				{cart.orderItems.map((item) => (
					<CartProduct orderItem={item} key={item.id} />
				))}
			</ul>
			<div className="mt-12">
				<div className="rounded border bg-neutral-50 px-4 py-2">
					<div className="flex items-center justify-between gap-2 py-2">
						<div>
							<p className="font-semibold text-neutral-900">Your Total</p>
							<p className="mt-1 text-sm text-neutral-500">
								Shipping will be calculated in the next step
							</p>
						</div>
						<div className="font-medium text-neutral-900">
							{formatMoney(total / 100)}
						</div>
					</div>
				</div>
				<form className="mt-10 text-center" action={handlePaymentAction}>
					<button
						className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed sm:w-1/3 sm:px-16"
						type="submit"
					>
						Checkout
					</button>
				</form>
			</div>
		</section>
	);
}
