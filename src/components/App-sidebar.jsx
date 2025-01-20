"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function AppSidebar() {
    const { theme } = useTheme();
    const [logoUrl, setLogoURl] = useState('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')
    const location = usePathname();
    const { isConnected, address } = useAccount();

    const SidebarMenuiItems = [
        { title: "Home", url: "/", icon: "fa-duotone fa-thin fa-house", },
        { title: "Create NFT", url: "/create", icon: "fa-duotone fa-thin fa-paintbrush-fine", },
        { title: "Marketplace", url: "/marketplace", icon: "fa-duotone fa-light fa-store", },
        { title: "My NFTs", url: "/my-nfts", icon: "fa-duotone fa-thin fa-image", },
    ];

    useEffect(() => {
        if (theme === 'light') {
            setLogoURl('https://upload.wikimedia.org/wikipedia/commons/1/12/5ire-logo2024.png')
        }
        else {
            setLogoURl('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')
        }
    }, [theme])
    return (
        <Sidebar className='backdrop-filter-blur' collapsible="icon">
            <SidebarContent>
                <SidebarSeparator />
                <SidebarGroup className='mt-8'>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarMenu>
                            {SidebarMenuiItems.map((item) => (
                                <SidebarMenuItem className='hover:bg-mute focus:bg-mute' key={item.title}>
                                    <SidebarMenuButton className='hover:bg-mute focus:bg-mute' asChild>
                                        <Link
                                            className={`flex text-[1.05rem] hover:bg-mute focus:bg-mute items-center gap-1 ${location === item.url ? "bg-secondary font-bold" : ''} `}
                                            href={item.url}>
                                            <i className={item.icon}></i>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            {isConnected &&
                                <SidebarMenuItem>
                                    <SidebarMenuButton className='hover:bg-mute focus:bg-mute' asChild>
                                        <Link
                                            className={`flex text-[1.05rem] hover:bg-mute focus:bg-mute items-center gap-1 ${location.includes(`/account/${address}`) ? "bg-secondary font-extrabold" : ''} `}
                                            href={`/account/${address}/owned`}>
                                            <i className="fa-solid fa-user"></i>
                                            <span>Account</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    );
}
