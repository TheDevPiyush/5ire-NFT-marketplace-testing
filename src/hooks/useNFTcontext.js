"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import _abiNFT from '@/utils/FireNFTToken.json';
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json';

const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const [NFTs, setNFTs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [MarketplaceAddress] = useState('0x6f42F3F1aE13d23B302555C700DD61255B3A6Eb6');

    const {
        data: getALLNFTsdata,
        isLoading: getALLNFTsdataLoading,
        error: getALLOwnedNFTsdataError,
        refetch: getAllNFTs,
        isSuccess: getALLNFTsdataSuccess
    } = useReadContract({
        abi: _abiMarketPlace.abi,
        address: MarketplaceAddress,
        functionName: 'getAllNFTs',
        args: [],
        enabled: true,
    });

    useEffect(() => {
        console.info("NFT Context is working....")
        const fetchNFTs = async () => {
            try {
                setLoading(true);
                await getAllNFTs();
            } catch (err) {
                setError(err.message || 'Failed to fetch NFTs');
            } finally {
                setLoading(false);
            }
        };
        fetchNFTs();
    }, [getAllNFTs]);

    useEffect(() => {
        console.log(getALLNFTsdata)
        if (getALLNFTsdata) {
            setNFTs(getALLNFTsdata || []);
            console.log(getALLNFTsdata);
        }
        if (getALLOwnedNFTsdataError) {
            setError(getALLOwnedNFTsdataError.message);
        }
    }, [getALLNFTsdata, getALLNFTsdataSuccess, getALLOwnedNFTsdataError]);

    return (
        <NFTContext.Provider value={{ NFTs, loading: getALLNFTsdataLoading || loading, error, refetch: getAllNFTs }}>
            {children}
        </NFTContext.Provider>
    );
};

export const useNFTContext = () => {
    const context = useContext(NFTContext);
    if (!context) {
        throw new Error('useNFTContext must be used within an NFTProvider');
    }
    return context;
};
