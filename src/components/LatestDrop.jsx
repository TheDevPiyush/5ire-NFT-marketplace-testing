import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
import { truncateAddress } from '@/lib/truncateAddress';
import { Button } from './ui/button';
import { useAccount, useTransactionReceipt, useWriteContract } from 'wagmi';
import _abiNFT from '@/utils/FireNFTToken.json'
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json'
import { parseEther, parseEventLogs } from 'viem';
import { useToast } from '@/hooks/use-toast';
import { Turtle } from 'lucide-react';
import LoadingCard from './LoadingCard';
import { useNFTContext } from '@/hooks/useNFTcontext';

export default function LatestDrop({ nftMetadataList, loadingState }) {


    const { address, isConnected, isDisconnected } = useAccount();
    const { toast } = useToast();
    const { refetch } = useNFTContext();

    const MarketPlaceAbi = _abiMarketPlace.abi;

    const [NFTAddress, setNFTaddress] = useState("0xBfA802aB26C07F157f0F710c78c13792CbC64121");
    const [MarketplaceAddress, setMarketplaceAddress] = useState('0x6f42F3F1aE13d23B302555C700DD61255B3A6Eb6');

    const [buyButtonState, setBuyButtonState] = useState({ state: 'Buy', disabled: false })
    const [currentTransactionItemId, setCurrentTransactionItemId] = useState(null);


    const { writeContractAsync: buyNFT, data: buyNFTdata, isError: isbuyNftError, error: buyNftError, isSuccess: isBuyNFTSuccess } = useWriteContract();
    const { data: txBuyNFTdata, isSuccess: txBuyNFTisSuccess, isError: txBuyNFTisError } = useTransactionReceipt({ hash: buyNFTdata });


    const handleBuyNFT = async (item) => {

        if (!isConnected || isDisconnected) return toast({ title: "Please log in to Buy NFTs 🔑" })
        if (address === item.owner) return toast({ title: "You are already the proud owner ❤️" })
        setCurrentTransactionItemId(item.itemId);
        setBuyButtonState({ state: 'Transacting...', disabled: true })
        await buyNFT({
            abi: MarketPlaceAbi,
            address: MarketplaceAddress,
            args: [item.itemId],
            functionName: "buyWithNative",
            value: parseEther(item.price.toString())
        })
    }

    useEffect(() => {
        if (buyNftError || isbuyNftError || txBuyNFTisError || !txBuyNFTdata) {
            console.log(buyNFTdata, txBuyNFTdata, txBuyNFTisError)
            toast({ title: "Transaction Failed 🛑" })
            refetch;
        }
        else if (isBuyNFTSuccess) {
            toast({ title: "NFT Bought Successfully ✅😀" })
            refetch;
        }
        setCurrentTransactionItemId(null);
        setBuyButtonState({ state: 'Buy', disabled: false })
    }, [txBuyNFTdata, txBuyNFTisSuccess, txBuyNFTisError, buyNftError])

    return (


        <div className='w-full p-3 justify-center items-center h-screen overflow-auto select-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
            {!loadingState ? nftMetadataList.map((item, index) => (
                <Card className='cursor-pointer border-2 p-3'>
                    <div className="flex flex-col rounded-md items-center justify-center">
                        <div className='overflow-hidden rounded-sm  aspect-video bg-red'>
                            <img className='hover:scale-110 transition-all bg-contain' src={item.metadata.image} alt="" />
                        </div>
                        <div className="w-full text-left my-2">
                            <div className='Name-Div mx-2'>
                                <div className='Username my-1 w-full flex items-center justify-between text-muted-foreground'>

                                    <div className='w-[50%] text-[1rem] overflow-hidden'>
                                        {item.isListed && <>
                                            {item.price.toString()} 5ire
                                        </>}
                                    </div>
                                    <div className='cursor-pointer overflow-hidden text-ellipsis w-[50%] text-right text-sm font-bold hover:text-blue-500'>
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
                                        <span className='text-red-400 items-center font-medium text-sm'>
                                            <span className='inline-block h-1 w-1 rounded-full border-4 border-solid border-red-400' /> Not Listed
                                        </span>
                                    }
                                </div>
                                <div className='text-[0.8rem] text-muted-foreground'>
                                    {new Date(Number(item.timestamp) * 1000).toLocaleString()}
                                </div>
                                <Button
                                    onClick={() => handleBuyNFT(item)}
                                    className={`my-3 py-5 text-base w-full font-bold ${!item.isListed ? 'bg-accent' : 'bg-primary'}`}
                                    disabled={!item.isListed || currentTransactionItemId === item.itemId}
                                >
                                    {!item.isListed ? (
                                        "Not Listed"
                                    ) : (
                                        <>
                                            {currentTransactionItemId === item.itemId
                                                ?
                                                <>
                                                    <span>Transacting...</span>
                                                    <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent"></span>
                                                </>
                                                :
                                                <>
                                                    <span>Buy</span>
                                                </>
                                            }
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))
                :
                <LoadingCard />
            }
        </div >


    )
}
