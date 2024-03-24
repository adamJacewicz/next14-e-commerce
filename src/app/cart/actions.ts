"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/utils";
import { getCartFromCookies } from "@/service/cart.service";

export async function changeItemQuantity({
	itemId,
	quantity,
	total,
}: {
	itemId: string;
	quantity: number;
	total: number;
}) {
	await executeGraphql({
		variables: { quantity, itemId, total },
		query: CartSetProductQuantityDocument,
		cache: "no-store",
	});
	revalidateTag("cart");
}

export async function removeItem(itemId: string) {
	await executeGraphql({
		variables: { itemId },
		query: CartRemoveProductDocument,
		cache: "no-store",
	});
	// revalidateTag("cart");
}

export async function handlePaymentAction() {
	const cart = await getCartFromCookies();
	if (!cart) {
		return;
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "paynow"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: item.product
				? {
						currency: "usd",
						product_data: {
							name: item.product.name,
							description: item.product.description,
							images: item.product.images.map(({url}) => url),
						},
						unit_amount: item.product.price,
				  }
				: undefined,
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/cancel`,
	});

	if (!checkoutSession.url) {
		throw new Error("Something went wrong!");
	}
	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
