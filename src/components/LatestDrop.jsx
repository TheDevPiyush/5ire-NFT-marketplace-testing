import React, { useEffect, useState } from 'react'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from '@/components/ui/card';
import { truncateAddress } from '@/lib/truncateAddress';
import { Button } from './ui/button';
import { useAccount, useTransactionReceipt, useWriteContract } from 'wagmi';
import _abiNFT from '@/utils/FireNFTToken.json'
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json'
import { parseEther, parseEventLogs } from 'viem';
import { useToast } from '@/hooks/use-toast';

export default function LatestDrop({ NFTs }) {


    const [nftMetadataList, setNftMetadataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const { address, isConnected, isDisconnected } = useAccount();
    const { toast } = useToast();

    const NFTabi = _abiNFT.abi;
    const NFTbyteCode = _abiNFT.bytecode;

    const MarketPlaceAbi = _abiMarketPlace.abi;
    const MarketplaceByteCode = _abiMarketPlace.bytecode;

    const [NFTAddress, setNFTaddress] = useState("0xBfA802aB26C07F157f0F710c78c13792CbC64121");
    const [MarketplaceAddress, setMarketplaceAddress] = useState('0x6f42F3F1aE13d23B302555C700DD61255B3A6Eb6');

    const [buyButtonState, setBuyButtonState] = useState({ state: 'Buy', disabled: false })
    const { writeContractAsync: buyNFT, data: buyNFTdata } = useWriteContract();
    const { data: txBuyNFTdata, isSuccess: txBuyNFTisSuccess, isError: txBuyNFTisError } = useTransactionReceipt({ hash: buyNFTdata });


    const handleBuyNFT = async (item) => {

        if (!isConnected || isDisconnected) return toast({ title: "Please log in to Buy NFTs 🔑" })
        if (address === item.owner) return toast({ title: "You are already the proud owner ❤️" })
        setBuyButtonState({ state: 'Transacting...', disabled: true })
        await buyNFT({
            abi: MarketPlaceAbi,
            address: MarketplaceAddress,
            args: [item.itemId],
            functionName: "buyWithNative",
            value: parseEther(item.price.toString())
        })
    }

    // useEffect(() => {

    //     const logs = parseEventLogs({
    //         abi: MarketPlaceAbi,
    //         eventName: "buyWithNative",
    //         logs: txBuyNFTdata.logs
    //     })
    //     console.log(logs)

    //     if (txBuyNFTisError) {
    //         toast({ title: "Transaction failed due to unknown error ☹️🛑" })
    //     }
    //     if (txBuyNFTisSuccess) {
    //         toast({ title: "NFT bought successfully 😀✅" })
    //     }
    //     setBuyButtonState({ state: 'Buy NFT', disabled: false })

    // }, [txBuyNFTdata, txBuyNFTisSuccess, txBuyNFTisError])


    useEffect(() => {
        async function fetchMetadataForNFTs() {
            try {
                const metadataPromises = NFTs.map(async (nft) => {
                    const response = await fetch(nft.nftURI);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch metadata for NFT with itemId: ${nft.itemId}`);
                    }
                    const metadata = await response.json();
                    return { ...nft, metadata };
                });
                const results = await Promise.all(metadataPromises);
                setNftMetadataList(results);
            } catch (err) {
                console.error('Error fetching NFT metadata:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        // Only fetch if there are NFTs to process
        if (NFTs && NFTs.length > 0) {
            fetchMetadataForNFTs();
        } else {
            setLoading(false);
        }
    }, [NFTs]);


    return (
        <div className='w-[95%] justify-center flex items-center h-fit select-none flex-wrap'>
            <Carousel className='w-full'>
                <CarouselPrevious />
                <CarouselContent>
                    {
                        nftMetadataList.map((item, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/5 lg:basis-1/7">
                                <Card className='cursor-pointer border-2 p-2'>
                                    <div className="flex flex-col rounded-md items-center justify-center">
                                        <div className='overflow-hidden rounded-sm  aspect-video bg-red'>
                                            <img className='hover:scale-110 transition-all bg-contain' src={item.metadata.image} alt="" />
                                        </div>
                                        <div className="w-full text-left my-2">
                                            <div className='Name-Div mx-2'>
                                                <div className='Username my-1 w-full flex items-center justify-between text-muted-foreground'>

                                                    <div className='w-[50%] text-[1rem] overflow-hidden'>
                                                        {item.price.toString()} <span>5ire</span>
                                                    </div>

                                                    <div className='cursor-pointer w-[50%] text-right text-sm font-bold hover:text-blue-500'>
                                                        {truncateAddress(item.owner)}
                                                    </div>
                                                </div>

                                                <div className='font-bold my-2 flex justify-between text-[1.2rem]'>
                                                    {item.metadata.name}
                                                    {item.isListed
                                                        ?
                                                        <span className='text-green-400 items-center font-medium text-sm'>
                                                            <span className='inline-block h-1 w-1 rounded-full border-4 border-solid border-green-600' /> Listed
                                                        </span>
                                                        :
                                                        <span className='text-red-400 text-sm items-center font-medium'>
                                                            <span className='inline-block h-1 w-1 rounded-full border-4 border-solid border-red-400' /> Not Listed
                                                        </span>
                                                    }
                                                </div>
                                                <Button
                                                    onClick={() => handleBuyNFT(item)}
                                                    className="my-2 text-lg w-full font-bold"
                                                    disabled={!item.isListed || buyButtonState.disabled}
                                                >
                                                    {!item.isListed ? (
                                                        "Item not listed yet"
                                                    ) : (
                                                        <>
                                                            {buyButtonState.state}
                                                            {buyButtonState.disabled && (
                                                                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent"></span>
                                                            )}
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>))}
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div>

    )
}
