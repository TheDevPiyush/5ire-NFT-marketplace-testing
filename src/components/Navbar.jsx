"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SidebarTrigger } from './ui/sidebar';
import { SearchContext } from '@/hooks/SearchContextHook';
import { BrowserProvider } from 'ethers';
import { useTheme } from 'next-themes';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useAccountEffect } from 'wagmi';

const Navbar = () => {

    const { setSearchQuery } = useContext(SearchContext);
    const { account, chain } = useAccount();
    const dialogTriggerRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const ExampleSearchSuggestions = [
        'Example Search Suggestion 1 - Monkey Collection',
        'Example Search Suggestion 2 - Cat Collection',
        'Example Search Suggestion 3 - 0x9w8efw89efhwef8we',
        'Example Search Suggestion 4 - Random Collection',
    ]
    const { toast } = useToast()

    const { setTheme, theme } = useTheme();
    const [logoUrl, setLogoURl] = useState('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')

    const dropdownMenuItems = [
        { title: "Profile", url: `/account/${account}`, icon: "fa-duotone fa-light fa-user", },
        { title: "My NFTs", url: "/my-nfts", icon: "fa-duotone fa-thin fa-image", },
    ];

    useAccountEffect({

        onConnect(data) {
            toast({
                description: `${data.chain.name} is connected! ✅`
            })
        },

        onDisconnect() {
            toast({
                description: `Wallet Disconnected! 🛑`
            })
        }
    })

    useEffect(() => {
        if (theme === 'light') {
            setLogoURl('https://upload.wikimedia.org/wikipedia/commons/1/12/5ire-logo2024.png')
        }
        else {
            setLogoURl('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')
        }
    }, [theme])
    return (
        <div className="w-full fixed z-10">
            <nav className="flex items-center
            border-b-2
            border-muted justify-between px-4 py-2 dark:bg-[rgb(3,7,18,0.7)] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl text-foreground">
                {/* Sidebar Trigger */}
                <div className='flex items-center gap-4'>
                    <SidebarTrigger className='scale-150 bg-accent' />
                    <img class='hidden md:block lg:block w-20' src={logoUrl} alt="Logo" />
                </div>

                {/* Search Button with Dialog */}
                <Dialog>
                    <DialogTrigger ref={dialogTriggerRef} className='w-[30%] lg:w-[30%] sm:w-[20%] rounded-sm flex items-center justify-center gap-2 py-2 text-muted-foreground bg-accent'>
                        <i class="fa fa-search text-sm" aria-hidden="true"></i><span className='lg:text-base md:text-base sm:text-sm'>Search</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Search NFT</DialogTitle>
                        <Command>
                            <CommandInput
                                className="focus:outline-none my-2 px-2 focus:bg-muted"
                                placeholder="Search for collections, NFT or Users.." />
                            <CommandList>
                                <CommandGroup className='font-mono' heading="Suggestions">
                                    {ExampleSearchSuggestions.map((item) => (
                                        <CommandItem onSelect={() => { setSearchQuery(item); dialogTriggerRef.current.click() }} key={item} className='text-left py-2'>
                                            {item}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </DialogContent>
                </Dialog>

                {/* ------------------------------------------------ */}
                {/* LOG IN USER WITH RAINBOW CONNECT BUTTON*/}
                <div className=''>
                    <ConnectButton accountStatus={{
                        smallScreen: 'avatar',
                        largeScreen: 'avatar',
                    }} chainStatus="icon" showBalance={false} />
                </div>

            </nav>
        </div>
    );
}
export default Navbar;
