"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { SidebarMenuButton, SidebarTrigger } from './ui/sidebar';
import { SearchContext } from '@/hooks/SearchContextHook';
import { useWallet } from '@/hooks/useWallet';
import { BrowserProvider } from 'ethers';
import { truncateAddress } from '@/lib/truncateAddress';
import { useTheme } from 'next-themes';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Moon, Sun } from "lucide-react";
import Link from 'next/link';

const Navbar = () => {

    const { setSearchQuery } = useContext(SearchContext);
    const { walletAddress, updateWalletAddress, signer, updateSigner } = useWallet();
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
        { title: "Profile", url: `/account/${walletAddress}`, icon: "fa-duotone fa-light fa-user", },
        { title: "My NFTs", url: "/my-nfts", icon: "fa-duotone fa-thin fa-image", },
    ];
    // THIS FUNCTIONS CHECKS METAMASK INSTALLATION AND LOGS IN THE USER WITH THEIR ACCOUNT.

    const connectWalletWithMetaMask = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                setLoading(true);
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                updateSigner(signer);
                updateWalletAddress(address);
                setLoading(false);
                console.log('Signer global : ', signer);
            } catch (err) {
                setLoading(false);
                toast({
                    description: "Couldn't Connect to wallet ☹️ Please try again.",
                })
            }
        } else {
            setLoading(false);
            toast({
                title: 'MetaMask Not Installed 🛑',
                description: 'Please install metamask wallet to login.',
            })
        }
    };

    // THIS FUNCTIONS CHECKS 5ire WALLET INSTALLATION AND LOGS IN THE USER WITH THEIR ACCOUNT.

    const connectWalletWith5ireWallet = async () => {
        if (typeof window.fire !== "undefined") {
            try {
                setLoading(true);
                const provider = new BrowserProvider(window.fire);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                updateSigner(signer);
                updateWalletAddress(address);
                setLoading(false);
                console.log('Signer global : ', signer);
            } catch (err) {
                setLoading(false);
                toast({
                    description: "Couldn't Connect to wallet ☹️ Please try again.",
                })
            }
        } else {
            setLoading(false);
            toast({
                title: '5ire Wallet Not Installed 🛑',
                description: 'Please install 5ire Wallet to login.',
            })
        }
    }

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            const handleAccountsChanged = (accounts) => {
                setLoading(true);
                if (accounts.length > 0) {
                    connectWalletWithMetaMask();
                    toast({ description: "MetaMask Connected 😀✅", });
                }
                else {
                    toast({ description: "MetaMask Disconnected 😀🛑", });
                    updateSigner(null);
                    updateWalletAddress(null);
                }
            };
            setLoading(false);
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        };
    }, [])

    useEffect(() => {
        if (typeof window.fire !== "undefined") {
            const handleAccountsChanged = (accounts) => {
                setLoading(true);
                if (accounts.length > 0) {
                    connectWalletWith5ireWallet();
                    toast({ description: "5ire Wallet Connected 😀✅", })
                }
                else {
                    toast({ description: "5ire Wallet Disconnected 😀🛑", })
                    updateSigner(null);
                    updateWalletAddress(null);
                }
            };
            setLoading(false);
            window.fire.on("accountChanged", handleAccountsChanged);
            window.fire.on("connect", () => { toast({ description: "5ire Wallet Connected 😀✅", }) })
            window.fire.on("disconnect", () => {
                toast({ description: "5ire Wallet Disconnected 😀🛑" });
                updateSigner(null);
                updateWalletAddress(null);
            })

            return () => {
                window.fire.removeListener("accountChanged", handleAccountsChanged);
            };
        };
    }, [])

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
                    <DialogTrigger ref={dialogTriggerRef} className='w-[40%] lg:w-[40%] sm:w-[20%] rounded-sm flex items-center justify-center gap-2 py-2 text-muted-foreground bg-accent'>
                        <i class="fa fa-search text-sm" aria-hidden="true"></i><span className='lg:text-base md:text-base sm:text-sm'> Search NFTs </span>
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
                {/* LOG IN USER WITH THEIR 5IRE WALLET OR METAMASK */}

                {!walletAddress
                    ?
                    // WALLET CONNECT BUTTON 
                    // ---------------------------------------------------
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='sm:text-sm'>Connect Wallet</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[420px]">
                            <DialogHeader>
                                <DialogTitle className='font-bold text-2xl'>Connect Wallet</DialogTitle>
                                <DialogDescription>Choose your favourite wallet to log in 5ire Marketplace.</DialogDescription>
                            </DialogHeader>
                            <div className="py-2 flex flex-col gap-3">

                                {/* 5ire wallet connection */}
                                <div className="5ire w-full">
                                    <button onClick={connectWalletWith5ireWallet} className='w-full border-[1px] items-center border-muted rounded-lg p-3 hover:bg-accent flex gap-3  transition-all text-left'>
                                        <img
                                            src={"https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png"}
                                            className='w-8 rounded-full' alt="" />
                                        <span className='text-lg'>5ire Wallet</span>
                                    </button>
                                </div>


                                {/* MetaMask wallet connection */}
                                <div className="metamask w-full">
                                    <button onClick={connectWalletWithMetaMask} className='w-full border-[2px] items-center border-muted rounded-lg p-3 hover:bg-accent flex gap-3  transition-all text-left'>
                                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png'} className='w-8' alt="" />
                                        <span className='text-lg'>MetaMask</span>
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    :
                    // ACCOUNT BUTTON HERE
                    // -----------------------------------------------------
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="wrap">
                                <SidebarMenuButton className="flex bg-accent items-center justify-between py-5">
                                    <span className="flex sm:text-sm items-center space-x-2">
                                        <span>
                                            {truncateAddress(walletAddress) || "Not connected"}
                                        </span>
                                    </span>
                                    <ChevronsUpDown />
                                </SidebarMenuButton>
                            </div>
                        </DropdownMenuTrigger>

                        {/* ACCOUNT BUTTON DROPDOWN */}

                        <DropdownMenuContent className="w-50">
                            {dropdownMenuItems.map((item, index) => (
                                <DropdownMenuItem className={` ${location === item.url ? "bg-accent" : ''}`} key={index}>
                                    <Link
                                        href={item.url}
                                        className={`flex gap-2 p-[2px] items-center justify-start w-full`} >
                                        <i className={item.icon}></i>
                                        <span>{item.title}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                                onClick={() => { updateWalletAddress(null); updateSigner(null); }}
                                className={`flex gap-2 px-3 items-center justify-start w-full text-red-500 font-bold`}>
                                <i className="fa-sharp fa-solid fa-right-from-bracket" /> <span>Log Out</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />


                            {/* APP THEME SELECTOR */}
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
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </nav>
        </div>
    );
}
export default Navbar;
