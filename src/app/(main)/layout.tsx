import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";

import RightSideBar from "./_right-side-bar";

export default function SignedInLayout({
	children,
	myfridge,
	myrecipes,
	tobuy,
	modal,
}: {
	children: React.ReactNode;
	myfridge: React.ReactNode;
	myrecipes: React.ReactNode;
	tobuy: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<>
			{modal}
			<div id="modal-root" />
			<section className="min-h-[calc(100vh_-_6rem)] grid grid-cols-[300px_minmax(300px,_1fr)_300px]">
				<aside>
					<SignedIn>{myfridge}</SignedIn>
				</aside>
				{children}
				<aside>
					<SignedIn>
						<RightSideBar myrecipes={myrecipes} tobuy={tobuy} />
					</SignedIn>
				</aside>
			</section>
		</>
	);
}
