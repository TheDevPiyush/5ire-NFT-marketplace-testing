"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/hooks/WalletConnectHook";
import { truncateAddress } from "@/lib/truncateAdderss";
import Link from "next/link";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function AppSidebar() {
    const { walletAddress } = useWallet();
    const { setTheme, theme } = useTheme();

    const location = usePathname();

    const dropdownMenuItems = [
        { title: "Account", url: `/account/${walletAddress}`, icon: "fa-duotone fa-light fa-user", },
        { title: "My NFTs", url: "/my-nfts", icon: "fa-duotone fa-thin fa-image", },
        { title: "Help & Contact", url: "/help", icon: "fa-duotone fa-thin fa-circle-info", },
        { title: "Log Out", url: "/logout", icon: "fa-duotone fa-light fa-right-from-bracket", },
    ];

    const SidebarMenuiItems = [
        { title: "Home", url: "/", icon: "fa-duotone fa-thin fa-house", },
        { title: "Create NFT", url: "/create", icon: "fa-duotone fa-thin fa-paintbrush-fine", },
        { title: "Marketplace", url: "/marketplace", icon: "fa-duotone fa-light fa-store", },
        { title: "My NFTs", url: "/my-nfts", icon: "fa-duotone fa-thin fa-image", },
        { title: "Sell NFT", url: "/sell", icon: "fa-duotone fa-solid fa-money-bill-transfer", },
    ];
    return (
        <Sidebar className='backdrop-filter-blur' collapsible="icon">
            <SidebarContent>
                <SidebarHeader className='flex justify-center'>
                    {
                        theme === "dark" ?
                            <Image width={85} height={85} alt="5ire Logo" className="rounded-lg dark:opacity-100" src={'https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75'} />
                            :
                            <Image width={85} height={85} alt="5ire Logo" className="rounded-lg dark:opacity-100" src={'https://upload.wikimedia.org/wikipedia/commons/1/12/5ire-logo2024.png'} />
                    }
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarMenu>
                            {SidebarMenuiItems.map((item) => (
                                <SidebarMenuItem className='hover:bg-mute focus:bg-mute' key={item.title}>
                                    <SidebarMenuButton className='hover:bg-mute focus:bg-mute' asChild>
                                        <Link
                                            className={`flex text-[1.05rem] hover:bg-mute focus:bg-mute items-center gap-1 ${location === item.url ? "bg-secondary font-extrabold" : ''} `}
                                            href={item.url}>
                                            <i className={item.icon}></i>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="wrap">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="flex SidebarMenuiItems-center justify-between py-5">
                                        <span className="flex items-center space-x-2">
                                            <i className="fa fa-user" aria-hidden="true" />
                                            <span>
                                                {truncateAddress(walletAddress) || "Not connected"}
                                            </span>
                                        </span>
                                        <i className="fa-sharp-duotone text-zinc-300 fa-regular fa-chevrons-up" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </div>
                    </DropdownMenuTrigger>

                    {/* ACCOUNT FOOTER BUTTON DROPDOWN HERE */}

                    <DropdownMenuContent className="w-50">
                        <DropdownMenuLabel>
                            {truncateAddress(walletAddress) || "Not connected"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {dropdownMenuItems.map((item, index) => (
                            <DropdownMenuItem className={` ${location === item.url ? "bg-accent" : ''}`} key={index}>
                                <Link
                                    href={item.url}
                                    className={`flex gap-2 p-[2px] SidebarMenuiItems-center justify-start w-full`}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.title}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />


                        {/* APP THEME DROPDOWN HERE */}
                        <div className="theme-wrap flex justify-between">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-50" align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>

                                    {/* This will cause problem with the CORRECT 5ire Logo in Side Bar */}
                                    {/* SHOULD BE AVOIDED TO BE USED IN PROD */}

                                    {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem> */}

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
