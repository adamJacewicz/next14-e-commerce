import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getOrdersByEmail } from "@/service/orders.service";

export default async function OrdersPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	const orders = await getOrdersByEmail(email);

	return (
		<div>
			<h1>{user.firstName}&rsquo;s Orders</h1>
			<ul>
				{orders.map((order) => (
					<li key={order.id}>
						<div>{order.id}</div>
						<div>
							<time dateTime={order.createdAt as string}>
								{new Date(order.createdAt as string).toLocaleString()}
							</time>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
