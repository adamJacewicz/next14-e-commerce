/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetByCategorySlugDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n    description\n  }\n}": types.CategoriesGetListDocument,
    "query CollectionsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CollectionsGetByCollectionSlugDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n    description\n  }\n}": types.CollectionsGetListDocument,
    "fragment ProductDetails on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n  collections {\n    description\n    name\n    id\n  }\n  reviews {\n    createdAt\n    rating\n    id\n    email\n    name\n    headline\n    content\n  }\n  variants {\n    ...SizeVariant\n    ...ColorVariant\n    ...SizeColorVariant\n  }\n}": types.ProductDetailsFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetBySlug($slug: String!) {\n  products(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}": types.ProductGetBySlugDocument,
    "fragment ProductListItem on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n}": types.ProductListItemFragmentDoc,
    "fragment ColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SizeVariant on ProductSizeVariant {\n  id\n  name\n}": types.ColorVariantFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {categories_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {collections_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetCountDocument,
    "query ProductsGetList($first: Int, $skip: Int, $search: String, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {_search: $search}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetRecommendationList {\n  products(orderBy: publishedAt_ASC, first: 4) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRecommendationListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n    description\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n    description\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductDetails on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n  collections {\n    description\n    name\n    id\n  }\n  reviews {\n    createdAt\n    rating\n    id\n    email\n    name\n    headline\n    content\n  }\n  variants {\n    ...SizeVariant\n    ...ColorVariant\n    ...SizeColorVariant\n  }\n}"): typeof import('./graphql').ProductDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetBySlug($slug: String!) {\n  products(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}"): typeof import('./graphql').ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SizeVariant on ProductSizeVariant {\n  id\n  name\n}"): typeof import('./graphql').ColorVariantFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {categories_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {collections_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int, $search: String, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {_search: $search}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetRecommendationList {\n  products(orderBy: publishedAt_ASC, first: 4) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetRecommendationListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
