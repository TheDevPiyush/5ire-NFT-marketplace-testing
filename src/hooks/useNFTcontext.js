"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import _abiNFT from '@/utils/FireNFTToken.json';
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json';

const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const [NFTs, setNFTs] = useState([]);
    const [nftMetadataList, setNftMetadataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { address } = useAccount();

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

    // Fetch all NFTs when the component mounts
    useEffect(() => {
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
    }, [getAllNFTs, address]);

    // Update NFT data and fetch metadata
    useEffect(() => {
        if (getALLNFTsdata) {
            setNFTs(getALLNFTsdata || []);
            fetchMetadataForNFTs(getALLNFTsdata);
        }
        if (getALLOwnedNFTsdataError) {
            setError(getALLOwnedNFTsdataError.message);
        }
    }, [getALLNFTsdata, getALLNFTsdataSuccess, getALLOwnedNFTsdataError]);

    // Fetch metadata for each NFT
    const fetchMetadataForNFTs = async (nfts) => {
        try {
            const metadataPromises = nfts.map(async (nft) => {
                try {
                    const response = await fetch(nft.nftURI);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch metadata for NFT with itemId: ${nft.itemId}`);
                    }
                    const metadata = await response.json();
                    return { ...nft, metadata };
                } catch (err) {
                    console.error(`Error fetching metadata for NFT with itemId: ${nft.itemId}`, err);
                    return { ...nft, metadata: null, error: err.message };
                }
            });
            const results = await Promise.all(metadataPromises);
            setNftMetadataList(results);
        } catch (err) {
            console.error('Error fetching NFT metadata:', err);
            setError(err.message);
        }
    };

    return (
        <NFTContext.Provider
            value={{
                NFTs,
                nftMetadataList,
                loading: getALLNFTsdataLoading || loading,
                error,
                refetch: getAllNFTs,
            }}>
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
