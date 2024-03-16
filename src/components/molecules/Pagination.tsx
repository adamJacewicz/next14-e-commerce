"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { cn } from "@/lib/utils";

type PaginationProps = {
	total: number;
	page: number;
	basePath: string;
	pageSize?: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export function Pagination({
	page,
	pageSize = PRODUCTS_PER_PAGE,
	total,
	hasPreviousPage,
	basePath,
	hasNextPage,
}: PaginationProps) {
	const totalPages = Math.ceil(total / pageSize);
	const visiblePages = Math.min(9, totalPages);
	const siblingCount = Math.floor(visiblePages / 2);
	const searchParams = useSearchParams();

	function getPageUrl(page: number) {
		const url = `${basePath}/${page}`;
		if (!searchParams.size) return url as Route;
		return `${url}?${searchParams.toString()}` as Route;
	}

	const pages = Array.from({ length: visiblePages }, (_, i) => {
		if (page + siblingCount >= totalPages)
			return totalPages - visiblePages + i + 1;
		if (page - siblingCount <= 0) return i + 1;
		return i + page - siblingCount;
	});
	if (total <= PRODUCTS_PER_PAGE) return null;

	return (
		<nav>
			<ul
				aria-label="pagination"
				className="mx-auto mt-10 flex max-w-xl justify-center gap-2 p-2"
			>
				<li>
					<Link
						className={cn(
							"inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-gray-200 bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
							!hasPreviousPage && "pointer-events-none text-gray-300",
						)}
						prefetch={hasPreviousPage}
						href={getPageUrl(page - 1)}
					>
						<ChevronLeft strokeWidth={1.5} />
					</Link>
				</li>
				{pages.map((pageNumber) => (
					<li key={pageNumber}>
						<ActiveLink
							className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							activeClassName="bg-gray-100"
							href={getPageUrl(pageNumber)}
						>
							{pageNumber}
						</ActiveLink>
					</li>
				))}
				<li>
					<Link
						className={cn(
							"inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input border-slate-300 bg-gray-200 bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
							!hasNextPage && "pointer-events-none text-gray-300",
						)}
						prefetch={hasNextPage}
						href={getPageUrl(page + 1)}
					>
						<ChevronRight strokeWidth={1.5} />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
