"use client";
import { useRef } from "react";
// import { SignedIn } from "@clerk/nextjs";
import { InputRating } from "../atoms/InputRating";

export function ReviewForm({
	formAction,
}: {
	formAction: (data: FormData) => Promise<void>;
}) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRatingRef = useRef<{ reset: () => void } | null>(null);

	return (
		<section className="max-w-md">
			<header>
				<h3 className="text-lg font-medium">Share your thoughts</h3>
				<p className="mt-1 text-sm text-gray-600">
					If you’ve used this product, share your thoughts with other customers
				</p>
			</header>
			<div className="mt-4">
				<form
					ref={formRef}
					action={async (data) => {
						await formAction(data);
						formRef.current?.reset();
						inputRatingRef.current?.reset();
					}}
					data-testid="add-review-form"
					className="flex flex-col gap-4 text-xs"
				>
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span className="mb-1 block text-xs">Name</span>
						<input
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							name="name"
							required
						/>
					</label>
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span className="mb-1 block text-xs">Email</span>
						<input
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							name="email"
							required
						/>
					</label>
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span className="mb-1 block text-xs">Title</span>
						<input
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							name="headline"
							required
						/>
					</label>
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						<span className="mb-1 block text-xs">Review</span>
						<textarea
							className="flex max-h-[150px] min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							name="content"
							required
						/>
					</label>
					<div>
						<span className="mb-1 block text-xs">Rate</span>
						<InputRating ref={inputRatingRef}/>
					</div>

					<button
						className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}
