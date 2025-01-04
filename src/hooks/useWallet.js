"use client";

import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [signer, setSigner] = useState(null);

    const updateWalletAddress = (address) => {
        setWalletAddress(address);
    };

    const updateSigner = (signer) => {
        setSigner(signer);
    }

    return (
        <WalletContext.Provider value={{ walletAddress, signer, updateWalletAddress, updateSigner }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
