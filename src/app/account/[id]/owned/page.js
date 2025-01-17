"use client"
import { useNFTContext } from '@/hooks/useNFTcontext';
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { useAccount, useTransactionReceipt, useWriteContract } from 'wagmi';
import { truncateAddress } from '@/lib/truncateAddress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import _abiNFT from '@/utils/FireNFTToken.json'
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { parseEther, parseEventLogs } from 'viem';
import { DialogClose } from '@radix-ui/react-dialog';


export default function page() {

  const { address } = useAccount();
  const { nftMetadataList, loading, error, refetch } = useNFTContext();
  const [price, setPrice] = useState(0);
  const [MarketplaceAddress, setMarketplaceAddress] = useState('0x6f42F3F1aE13d23B302555C700DD61255B3A6Eb6');
  const [NFTAddress, setNFTaddress] = useState("0xBfA802aB26C07F157f0F710c78c13792CbC64121");
  const [itemId, setItemId] = useState(null);
  const OwnerNFTs = nftMetadataList.filter((item) => item.owner === address);

  const { toast } = useToast();
  // ------------- THIS HOOK WILL LIST THE NFT WITH PRICE AND CHECK TRANSATION SUCCESS ON MARKEPLACE -------------------------
  const {
    writeContractAsync: ListNFTtoMarketPlaceContract,
    data: ListToMarketplaceData,
    isSuccess: ListNFTtoMarketPlaceContractSuccess,
    isError: ListNFTtoMarketPlaceContractError,
    error: ListNFTtoMarketPlaceContractErrorData
  } = useWriteContract();

  const {
    data: txListToMaketplace,
    isSuccess: txListToMaketplaceSuccess,
    isError: txListToMaketplaceIsError,
    error: txListToMaketplaceError
  } = useTransactionReceipt({ hash: ListToMarketplaceData })


  // ------------- THIS HOOK WILL UN-LIST THE NFT AND CHECK TRANSATION SUCCESS ON MARKEPLACE -------------------------
  const {
    writeContractAsync: unListNFTtoMarketPlaceContract,
    data: unListToMarketplaceData,
    isSuccess: unListNFTtoMarketPlaceContractSuccess,
    isError: unListNFTtoMarketPlaceContractError
  } = useWriteContract();

  const {
    data: txUnListToMaketplace,
    isSuccess: txUnListToMaketplaceSuccess,
    isError: txUnListToMaketplaceIsError,
    error: txUnListToMaketplaceError
  } = useTransactionReceipt({ hash: unListToMarketplaceData })


  // ------------- APPROVE THE NFT INTO THE MARKERTPLACE CONTRACT AND CHECK TRANSACTION SUCCESS --------------------------------
  const {
    writeContractAsync: approveNFT,
    data: approveNFTData,
    isSuccess: ApproveNFTSuccess
  } = useWriteContract();

  const {
    data: txApproveNFt,
    isSuccess: txApproveNFTSuccess
  } = useTransactionReceipt({ hash: approveNFTData })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handleListNFT = (itemId) => {
    if (price < 1) return;
    setItemId(itemId);
    try {
      ListNFTtoMarketPlaceContract({
        abi: _abiMarketPlace.abi,
        address: MarketplaceAddress,
        functionName: 'listNFTWithNative',
        args: [itemId, price],
        value: parseEther('0.5')
      })
    }
    catch {
      setItemId(null);
    }
  }

  useEffect(() => {
    if (txListToMaketplaceSuccess && txListToMaketplace) {
      const logs = parseEventLogs({
        abi: _abiMarketPlace.abi,
        eventName: "ItemListed",
        logs: txListToMaketplace.logs
      })
      toast({
        title: `NFT Listed with ${price} 5ire to Marketplace ✅`,
      })
      approveNFT({
        abi: _abiNFT.abi,
        address: NFTAddress,
        functionName: 'approve',
        args: [MarketplaceAddress, itemId]
      })
    }
  }, [txListToMaketplaceSuccess, txListToMaketplace])

  useEffect(() => {
    if (!txApproveNFt || !txApproveNFTSuccess) return;
    toast({
      title: 'NFT approved and added to the marketplace. ✅'
    })
    setItemId(null);
  }, [txApproveNFt, txApproveNFTSuccess])


  const handleUnlistNFT = (itemId) => {
    setItemId(itemId);
    unListNFTtoMarketPlaceContract({
      abi: _abiMarketPlace.abi,
      address: MarketplaceAddress,
      functionName: 'unlistNFT',
      args: [itemId],
    })
  }

  useEffect(() => {
    if (unListNFTtoMarketPlaceContractError || ListNFTtoMarketPlaceContractError) {
      setItemId(null);
      toast({
        title: "Could not complete, Please Try Again.🛑"
      })
    }
    else if (unListNFTtoMarketPlaceContractSuccess) {
      toast({
        title: "NFT unlisted successfully ✅"
      })
      refetch;
      setItemId(null);
    }
  }, [unListNFTtoMarketPlaceContractError, unListNFTtoMarketPlaceContractSuccess, ListNFTtoMarketPlaceContractError])

  return (
    loading ? <div>loading....</div>
      :
      <div
        className='w-full p-3 h-screen overflow-auto select-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          OwnerNFTs.map((item) => (
            <Card className='cursor-pointerborder-2 p-3 h-fit'>
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

                    {!item.isListed ? (
                      <Dialog>
                        <DialogTrigger className='w-full my-2'>
                          <Button disabled={(itemId === item.itemId)} className="w-full">
                            {!(itemId === item.itemId)
                              ?
                              (<> List <i class="fa fa-upload" aria-hidden="true"></i> </>)
                              :
                              <>
                                Transacting...
                                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent"></span>
                              </>
                            }
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>What should be the Price? 🤔</DialogTitle>
                            <DialogDescription>Set a reasonable price for the viewers so that they can buy your NFT.</DialogDescription>
                          </DialogHeader>
                          <Input onChange={(e) => setPrice(e.target.value)} />
                          <DialogClose className='w-full'>
                            <Button className='w-full' onClick={() => { handleListNFT(item.itemId) }}>Confirm Listing</Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>

                    ) : (
                      <>

                        <Button disabled={(itemId === item.itemId)} onClick={() => { handleUnlistNFT(item.itemId) }} className="w-full my-2" variant="destructive">
                          {!(itemId === item.itemId)
                            ?
                            (<> Unlist <i class="fa fa-trash" aria-hidden="true"></i> </>)
                            :
                            <>
                              Transacting...
                              <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent"></span>
                            </>
                          }
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card >
          ))
        }
      </div >

  )
}

