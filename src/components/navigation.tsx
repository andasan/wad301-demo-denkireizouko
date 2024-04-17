"use client";

import Link from "next/link";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function NavigationList() {
	return (
		<ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
			<SignedOut>
				<NavItem href="/">Home</NavItem>
			</SignedOut>
			<NavItem href="/recipes">Recipes</NavItem>
			<SignedIn>
				<NavItem href="/shopping">Shopping List</NavItem>
				<NavItem href="/profile">
					<SignOutButton>
						<button
							type="button"
							className="rounded-full border-2 border-green-700 px-6 py-1 text-green-700 transition-colors hover:bg-green-500 hover:text-white"
						>
							Logout
						</button>
					</SignOutButton>
				</NavItem>
				{/* <li className="md:mr-12">
					<SignOutButton>
						<button
							type="button"
							className="rounded-full border-2 border-green-700 px-6 py-1 text-green-700 transition-colors hover:bg-green-500 hover:text-white"
						>
							Logout
						</button>
					</SignOutButton>
				</li> */}
			</SignedIn>
			<SignedOut>
				<li className="md:mr-12">
					<button
						type="submit"
						className="rounded-full border-2 border-green-700 px-6 py-1 text-green-700 transition-colors hover:bg-green-500 hover:text-white"
					>
						<SignInButton />
					</button>
				</li>
			</SignedOut>
		</ul>
	);
}

function NavItem({
	href,
	children,
}: {
	href?: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<li
			className={cn(
				pathname === href ? "font-bold" : "font-normal",
				"md:mr-12",
			)}
		>
			{href ? <Link href={href}>{children}</Link> : children}
		</li>
	);
}
