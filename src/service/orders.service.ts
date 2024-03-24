import { executeGraphql } from "@/lib/utils";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export async function getOrdersByEmail(email: string) {
	const { orders } = await executeGraphql({
		variables: { email },
		query: OrdersGetByEmailDocument,
		next: { tags: ["cart"] },
		cache: "no-store",
	});
	return orders;
}
