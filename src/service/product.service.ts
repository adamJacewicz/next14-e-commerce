import { executeGraphql } from "@/lib/utils";
import {
	ProductGetByIdDocument,
	ProductGetBySlugDocument,
	type ProductListItemFragment,
	type ProductOrderByInput,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetCountDocument,
	ProductsGetListDocument,
	type ProductsGetListQueryVariables,
	ProductsGetRecommendationListDocument,
} from "@/gql/graphql";
import { ORDER_OPTIONS, PRODUCTS_PER_PAGE } from "@/constants";

export async function getProductList(options?: {
	page: number;
	perPage?: number;
	search?: string;
	order?: ProductOrderByInput;
}) {
	let variables: ProductsGetListQueryVariables = { search: "" };
	// if (!options) {
	//
	// 	const {
	// 		productsConnection: {
	// 			aggregate: { count },
	// 			products,
	// 			pageInfo,
	// 		},
	// 	} = await executeGraphql({
	// 		query: ProductsGetListDocument,
	// 		variables: {},
	// 	});
	// 	return { products: products.map(({ node }) => node), count, pageInfo };
	// }

	if (options) {
		const perPage = options?.perPage ?? PRODUCTS_PER_PAGE;
		variables = {
			orderBy: options?.order ?? ORDER_OPTIONS[0]?.value,
			search: options?.search ?? "",
			skip: (options.page - 1) * perPage,
			first: perPage,
		};
	}

	const {
		productsConnection: {
			aggregate: { count },
			products,
		},
	} = await executeGraphql({
		variables: variables,
		query: ProductsGetListDocument,
		next: {
			revalidate: 15,
		},
	});

	return { products: products.map(({ node }) => node), count };
}

export async function getProductById(id: ProductListItemFragment["id"]) {
	const { product } = await executeGraphql({
		variables: { id },
		query: ProductGetByIdDocument,
		next: {
			revalidate: 1,
		},
	});
	return product;
}

export async function getProductBySlug(slug: string) {
	const { products } = await executeGraphql({
		variables: { slug },
		query: ProductGetBySlugDocument,
		next: {
			revalidate: 60 * 60 * 24,
		},
	});
	return products[0];
}

export async function getProductsListByCategory({
	slug,
	page,
	perPage = PRODUCTS_PER_PAGE,
	order,
}: {
	slug: string;
	page: number;
	perPage?: number;
	order: ProductOrderByInput;
}) {
	const {
		productsConnection: {
			products,
			aggregate: { count },
		},
	} = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			orderBy: order,
			skip: (page - 1) * perPage,
			first: perPage,
			slug,
		},
		next: {
			revalidate: 60 * 60 * 24,
		},
	});

	return { products: products.map(({ node }) => node), count };
}

export async function getProductsListByCollection({
	slug,
	page,
	order,
	perPage = PRODUCTS_PER_PAGE,
}: {
	slug: string;
	order: ProductOrderByInput;
	page: number;
	perPage?: number;
}) {
	const {
		productsConnection: {
			products,
			aggregate: { count },
		},
	} = await executeGraphql({
		variables: {
			orderBy: order,
			skip: (page - 1) * perPage,
			first: perPage,
			slug,
		},
		query: ProductsGetByCollectionSlugDocument,
	});

	return { products: products.map(({ node }) => node), count };
}

// const wait = async (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export async function getRecommendationProducts() {
	// await wait(2000);
	const { products } = await executeGraphql({
		query: ProductsGetRecommendationListDocument,
	});
	return products;
}

export async function getProductsBySearchQuery(search: string) {
	const {
		productsConnection: { products },
	} = await executeGraphql({
		variables: {
			search,
		},
		query: ProductsGetListDocument,
	});

	return products.map(({ node }) => node);
}

export async function getProductsCount() {
	const {
		productsConnection: {
			aggregate: { count },
		},
	} = await executeGraphql({
		query: ProductsGetCountDocument,
	});

	return count;
}
