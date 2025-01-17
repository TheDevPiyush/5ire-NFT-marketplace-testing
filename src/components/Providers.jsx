"use client"
import React, { ReactNode } from 'react'
import { ThemeProvider } from './Theme-provider'
import { WagmiProvider } from 'wagmi'
import { SidebarProvider } from './ui/sidebar'
import { SearchProvider } from '@/hooks/SearchContextHook'
import { AppSidebar } from './App-sidebar'
import Navbar from './Navbar'
import { Toaster } from './ui/toaster'
import { config } from "@/lib/wagamiConfig";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css';
import { NFTProvider } from '@/hooks/useNFTcontext'

export default function Providers({ children }) {

    const client = new QueryClient();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={true}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={client}>

                    <RainbowKitProvider coolMode modalSize="compact" showRecentTransactions={true} theme={{
                        lightMode: lightTheme(),
                        darkMode: darkTheme({ overlayBlur: 'small' }),
                    }}>
                        <SidebarProvider defaultOpen={false}>
                            <SearchProvider>
                                <div className="w-full flex overflow-hidden">
                                    <Toaster />

                                    <AppSidebar />
                                    <Navbar />
                                    <div className='w-full mt-16 px-3'>
                                        <NFTProvider>
                                            {children}
                                        </NFTProvider>
                                    </div>
                                </div>
                            </SearchProvider>
                        </SidebarProvider>
                    </RainbowKitProvider>

                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    )
}
