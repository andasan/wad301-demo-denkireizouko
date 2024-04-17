"use client";

import { usePathname } from "next/navigation";

export default function RightSideBar({
  tobuy,
  myrecipes,
}: {
  tobuy: React.ReactNode;
  myrecipes: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/shopping" && tobuy}
      {(pathname.includes("/recipes") || pathname.includes("/shopping/")) &&
        myrecipes}
    </>
  );
}
