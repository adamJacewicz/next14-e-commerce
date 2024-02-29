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
    "fragment ProductListItem on Product {\n  price\n  name\n  slug\n  description\n  id\n  averageRating\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetList($first: Int, $skip: Int, $search: String, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {_search: $search}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  price\n  name\n  slug\n  description\n  id\n  averageRating\n  images {\n    id\n    url\n  }\n  categories {\n    description\n    name\n    id\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int, $search: String, $orderBy: ProductOrderByInput) {\n  productsConnection(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    where: {_search: $search}\n  ) {\n    products: edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
