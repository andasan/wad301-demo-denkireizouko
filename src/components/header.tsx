import Link from "next/link";
import Image from "next/image";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from "@clerk/nextjs";

import NavigationList from "./navigation";

export default function Header() {
	return (
		<header className="relative flex w-full h-24  flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center bg-teal-400 shadow-lg mb-10">
			<Link
				href="/"
				className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
			>
				<span className="mr-2 text-4xl text-green-500">
					<Image
						src="/fridge-icon.svg"
						alt="ReizApp Logo"
						width={40}
						height={40}
						className="text-current"
					/>
				</span>
				ReizApp
			</Link>
			<input type="checkbox" className="peer hidden" id="navbar-open" />
			<label
				className="absolute top-5 right-7 cursor-pointer md:hidden"
				htmlFor="navbar-open"
			>
				<span className="sr-only">Toggle Navigation</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<title>Menu</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</label>
			<nav
				aria-label="Header Navigation"
				className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
			>
				<NavigationList />
			</nav>
		</header>
	);
}
