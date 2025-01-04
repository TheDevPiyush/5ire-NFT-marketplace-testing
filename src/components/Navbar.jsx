"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Avatar } from "@/components/ui/avatar";
import { SidebarTrigger } from './ui/sidebar';
import { SearchContext } from '@/hooks/SearchContextHook';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useWallet } from '@/hooks/WalletConnectHook';
import { BrowserProvider } from 'ethers';
import { truncateAddress } from '@/lib/truncateAddress';
import { useTheme } from 'next-themes';

const Navbar = () => {

    const { setSearchQuery } = useContext(SearchContext);
    const { walletAddress, updateWalletAddress } = useWallet();
    const dialogTriggerRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const ExampleSearchSuggestions = [
        'Example Search Suggestion 1 - Monkey Collection',
        'Example Search Suggestion 2 - Cat Collection',
        'Example Search Suggestion 3 - 0x9w8efw89efhwef8we',
        'Example Search Suggestion 4 - Random Collection',
    ]

    const { setTheme, theme } = useTheme();
    const [logoUrl, setLogoURl] = useState('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')


    // THIS FUNCTIONS CHECKS METAMASK INSTALLATION AND LOGS IN THE USER WITH THEIR ACCOUNT.

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                setLoading(true);
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                updateWalletAddress(address);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                console.error("Error connecting to wallet:", err);
            }
        } else {
            setLoading(false);
            alert("MetaMask Extension is not installed.\nPlease install MetaMask Extension to use this app.");
        }
    };

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            const handleAccountsChanged = (accounts) => {
                setLoading(true);

                if (accounts.length > 0) {
                    updateWalletAddress(accounts[0]);
                } else {
                    updateWalletAddress(null);
                }
            };
            setLoading(false);

            window.ethereum.on("accountsChanged", handleAccountsChanged);
            connectWallet();

            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
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
                    <img src={logoUrl} alt="Logo" className="w-20" />
                </div>

                {/* Search Button with Dialog */}
                <Dialog>
                    <DialogTrigger ref={dialogTriggerRef} className='w-[40%] rounded-sm flex items-center justify-center gap-2 py-2 text-muted-foreground bg-accent'>
                        <i class="fa fa-search" aria-hidden="true"></i> Search NFTs
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
                {!walletAddress
                    ?
                    <Button onClick={connectWallet} disabled={loading} className='font-semibold' >{loading ? "Connecting...." : 'Connect Wallet'}</Button>
                    :
                    truncateAddress(walletAddress)
                }
            </nav>
        </div>
    );
}
export default Navbar;
