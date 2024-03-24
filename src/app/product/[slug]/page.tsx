import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductBySlug } from "@/service/product.service";
import { ProductRecommendationList } from "@/components/molecules/ProductRecommendationList";
import { LoadingIndicator } from "@/components/atoms/LoadingIndicator";
import { ProductImage } from "@/components/atoms/ProductImage";
import { Rating } from "@/components/molecules/Rating";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { formatMoney } from "@/lib/utils";
import { VariantList } from "@/components/molecules/VariantList";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { addToCart, getOrCreateCart } from "@/service/cart.service";
// import { type ProductSize } from "@/types/types";
// import { type Sizes } from "@/gql/graphql";
// import { ActiveLink } from "@/components/atoms/ActiveLink";

import { ReviewList } from "@/components/molecules/ReviewList";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const product = await getProductBySlug(params.slug);
	return {
		title: product?.name,
		description: product?.description,
	};
}

export default async function ProductPage({
	params,
}: {
	params: { slug: string };
}) {
	const product = await getProductBySlug(params.slug);
	if (!product) return notFound();

	async function addToCartAction() {
		"use server";
		if (!product) return;
		const cart = await getOrCreateCart();
		const productId = product.id;
		const orderItem = cart?.orderItems?.find(
			(item) => item?.product?.id === productId,
		);

		await addToCart({
			orderId: orderItem ? orderItem.id : cart.id,
			productId,
			quantity: orderItem ? orderItem?.quantity + 1 : 1,
			total: orderItem
				? product.price * (orderItem.quantity + 1)
				: product.price,
		});
	}

	return (
		<>
			<section className="mx-auto flex flex-col md:flex-row lg:w-4/5">
				{product.images[0]?.url && (
					<div className="flex-1">
						<ProductImage src={product.images[0]?.url} alt={product.name} />
					</div>
				)}

				<main className="flex flex-1 flex-col gap-6 px-4 py-2">
					<div className="gap-2 text-gray-700 sm:text-xl">
						<div className="title-font flex items-center gap-2 text-sm tracking-widest text-gray-500">
							{product.categories.map(({ id, name }) => (
								<span key={id}>{name}</span>
							))}
						</div>
						<h1 className="font-medium">{product.name}</h1>
					</div>
					<Rating rating={product.averageRating as number} />
					<p>{formatMoney(product.price / 100)}</p>

					<ProductListItemDescription product={product} />

					<VariantList variants={product.variants} />
					{/*<div className="flex flex-wrap gap-2">*/}
					{/*	{product.relatedProducts?.map((p) => (*/}
					{/*		<ActiveLink*/}
					{/*			className="block w-1/4 rounded-sm border"*/}
					{/*			activeClassName={"border-black"}*/}
					{/*			key={p.id}*/}
					{/*			href={`/product/${p.slug}`}*/}
					{/*		>*/}
					{/*			{p.images[0]?.url && (*/}
					{/*				<ProductImage*/}
					{/*					className="p-2"*/}
					{/*					alt={p.name}*/}
					{/*					height={96}*/}
					{/*					width={96}*/}
					{/*					src={p.images[0]?.url}*/}
					{/*				/>*/}
					{/*			)}*/}
					{/*		</ActiveLink>*/}
					{/*	))}*/}
					{/*</div>*/}
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</main>
			</section>
			<ReviewList reviews={product.reviews} productId={product.id} />

			<Suspense fallback={<LoadingIndicator />}>
				<aside className="mt-12">
					<ProductRecommendationList />
				</aside>
			</Suspense>
		</>
	);
}
