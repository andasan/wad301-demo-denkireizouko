import { type NextRequest, NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/recipes"],
	afterAuth(auth, req, evt) {
		// Handle users who aren't authenticated
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}

		// Redirect signed in users to recipe page if they try to access the home page
		if (auth.userId && req.nextUrl.pathname === "/") {
			const orgSelection = new URL("/recipes", req.url);
			return NextResponse.redirect(orgSelection);
		}
		// // If the user is signed in and trying to access a protected route, allow them to access route
		// if (auth.userId && !auth.isPublicRoute) {
		//   return NextResponse.next();
		// }

		// Allow users visiting public routes to access them
		return NextResponse.next();
	},
});

export const config = {
	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
