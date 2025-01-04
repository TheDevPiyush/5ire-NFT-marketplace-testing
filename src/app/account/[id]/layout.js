"use client";
import { useWallet } from "@/hooks/WalletConnectHook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateAddress } from "@/lib/truncateAddress";

export default function AccountLayout({ children, params }) {
  const { walletAddress } = useWallet();
  const pathname = usePathname(); // Get the current path

  const { id } = React.use(params); // Extract `id` from dynamic route params (Wrapped with React.use because params is outdated)

  const navItems = [
    { name: "Account", path: `/account/${id}` },
    { name: "Owned", path: `/account/${id}/owned` },
    { name: "Created", path: `/account/${id}/created` },
  ];

  return (
    <div className="px-8">
      <div className="relative w-full rounded-lg bg-gray-700 h-[250px] group">
        <button className="absolute right-4 top-4 px-4 py-2 text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click Me
        </button>
        <button className="absolute -bottom-8 left-4 rounded-full w-32 h-32 bg-black">hello</button>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row justify-between">
        <div className="text-3xl flex max-lg:mb-5">
          <p>User</p>
          <div className="flex">
            <span className="ml-2 flex justify-center text-gray-500">
              <i class="fa-solid fa-badge-check"></i>
              <span className="ml-2 text-lg text-gray-500">Get verified</span>
            </span>
          </div>
        </div>

        <Card className="h-40 w-full sm:w-96 rounded-3xl py-5 text-small sm:text-base">
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Followers</p>
            <p> 0</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Following</p>
            <p> 0</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Address</p>
            <p> {truncateAddress(walletAddress)}</p>
          </CardContent>
        </Card>
      </div>

      <nav className="my-4 text-lg">
        <div className="container flex">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`text-gray-300 hover:text-white px-3 py-2 ${pathname === item.path ? "border-b-2 border-white text-white" : ""
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
