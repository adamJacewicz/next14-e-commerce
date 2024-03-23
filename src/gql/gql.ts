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
    "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total}}\n    where: {id: $orderId}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  total\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      ...ProductListItem\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetByCategorySlugDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n    description\n  }\n}": types.CategoriesGetListDocument,
    "query CollectionsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CollectionsGetByCollectionSlugDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n    description\n  }\n}": types.CollectionsGetListDocument,
    "fragment ProductDetails on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n  collections {\n    description\n    name\n    id\n  }\n  reviews {\n    createdAt\n    rating\n    id\n    email\n    name\n    headline\n    content\n  }\n  variants {\n    ...SizeVariant\n    ...ColorVariant\n    ...SizeColorVariant\n  }\n}": types.ProductDetailsFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetBySlug($slug: String!) {\n  products(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}": types.ProductGetBySlugDocument,
    "fragment ProductListItem on Product {\n  price\n  name\n  slug\n  description\n  id\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n}": types.ProductListItemFragmentDoc,
    "fragment ColorVariant on ProductColorVariant {\n  __typename\n  id\n  name\n}\n\nfragment SizeColorVariant on ProductSizeColorVariant {\n  __typename\n  id\n  name\n}\n\nfragment SizeVariant on ProductSizeVariant {\n  __typename\n  id\n  name\n}": types.ColorVariantFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {categories_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!, $skip: Int, $first: Int, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {collections_some: {slug: $slug}}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetCountDocument,
    "query ProductsGetList($first: Int, $skip: Int, $search: String, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {_search: $search}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetRecommendationList {\n  products(orderBy: publishedAt_ASC, first: 4) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRecommendationListDocument,
    "mutation ReviewAddToProduct($review: ReviewCreateInput!, $productId: ID!) {\n  createReview(data: $review) {\n    id\n    product {\n      id\n      reviews {\n        rating\n      }\n    }\n  }\n  publishManyReviews(to: PUBLISHED, where: {product: {id: $productId}}) {\n    count\n  }\n}": types.ReviewAddToProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!, $quantity: Int!) {\n  upsertOrderItem(\n    upsert: {create: {quantity: 1, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total}}\n    where: {id: $orderId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  total\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $itemId}\n    data: {quantity: $quantity, total: $total}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
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
export function graphql(source: "fragment ColorVariant on ProductColorVariant {\n  __typename\n  id\n  name\n}\n\nfragment SizeColorVariant on ProductSizeColorVariant {\n  __typename\n  id\n  name\n}\n\nfragment SizeVariant on ProductSizeVariant {\n  __typename\n  id\n  name\n}"): typeof import('./graphql').ColorVariantFragmentDoc;
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewAddToProduct($review: ReviewCreateInput!, $productId: ID!) {\n  createReview(data: $review) {\n    id\n    product {\n      id\n      reviews {\n        rating\n      }\n    }\n  }\n  publishManyReviews(to: PUBLISHED, where: {product: {id: $productId}}) {\n    count\n  }\n}"): typeof import('./graphql').ReviewAddToProductDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
