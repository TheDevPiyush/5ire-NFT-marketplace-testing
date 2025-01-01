"use client"

import React, { useContext, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Avatar } from "@/components/ui/avatar";
import { SidebarTrigger } from './ui/sidebar';
import { SearchContext } from '@/hooks/SearchContextHook';
import { DialogTitle } from '@radix-ui/react-dialog';

const Navbar = () => {

    const { setSearchQuery } = useContext(SearchContext);

    const dialogTriggerRef = useRef(null);

    const ExampleSearchSuggestions = [
        'Example Search Suggestion 1 - Monkey Collection',
        'Example Search Suggestion 2 - Cat Collection',
        'Example Search Suggestion 3 - 0x9w8efw89efhwef8we',
        'Example Search Suggestion 4 - Random Collection',
    ]


    return (
        <nav className="flex items-center border-b-2 w-full border-muted justify-between px-4 py-2 bg-background text-foreground">
            {/* Sidebar Trigger */}
            <SidebarTrigger className='scale-150' />

            {/* Search Button with Dialog */}
            <Dialog>
                <DialogTrigger ref={dialogTriggerRef} className='w-[40%] rounded-sm py-1 text-muted-foreground bg-accent'>
                    <Button variant="ghost">Search NFTs</Button>
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

            <Avatar>
                <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" alt="User Avatar" />
            </Avatar>

        </nav>
    );
}
export default Navbar;
