"use client";

import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);

    const updateWalletAddress = (address) => {
        setWalletAddress(address);
    };

    return (
        <WalletContext.Provider value={{ walletAddress, updateWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
