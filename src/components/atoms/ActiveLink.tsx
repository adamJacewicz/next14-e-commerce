"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ActiveLinkProps<T extends string> extends LinkProps<T> {
	activeClassName: string;
	exact?: boolean;
	className: string;
}

export function ActiveLink<T extends string>({
	children,
	activeClassName,
	className,
	href,
	exact = true,
	...rest
}: ActiveLinkProps<T>) {
	const currentPath = usePathname();
	const [matchedPath] = (
		typeof href === "string" ? href : href.pathname || ""
	).split("?");

	const isActive = exact
		? currentPath === matchedPath
		: currentPath.startsWith(matchedPath as string);

	return (
		<Link
			aria-current={isActive ? "page" : undefined}
			href={href}
			className={cn(className, isActive && activeClassName)}
			{...rest}
		>
			{children}
		</Link>
	);
}
