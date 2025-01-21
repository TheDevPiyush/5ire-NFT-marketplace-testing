"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { truncateAddress } from "@/lib/truncateAddress";
import { useAccount, useWriteContract, useTransactionReceipt } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import _abiNFT from '@/utils/FireNFTToken.json'
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json'
import { parseEther, parseEventLogs } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function createNFTPage() {


  const [NFTAddress, setNFTaddress] = useState("0xBfA802aB26C07F157f0F710c78c13792CbC64121");
  const NFTabi = _abiNFT.abi;
  const NFTbyteCode = _abiNFT.bytecode;

  const [MarketplaceAddress, setMarketplaceAddress] = useState('0x6f42F3F1aE13d23B302555C700DD61255B3A6Eb6');
  const MarketPlaceAbi = _abiMarketPlace.abi;
  const MarketplaceByteCode = _abiMarketPlace.bytecode;


  const [uploadButtonState, setUploadButtonState] = useState({ state: "Mint NFT", disabled: false })
  const [files, setFiles] = useState(null);
  const [urlList, setUrlList] = useState([]);
  const [price, setPrice] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState(0);


  const [mintEvent, setMintEvent] = useState({ address: "", tokenId: "", tokenURI: "" });
  const [itemAddedEvent, setItemAddedEvent] = useState({
    itemId: '',
    sender: "",
    nftContractAdd: "",
    tokenId: "",
    nftURI: "",
    price: "",
    isListed: "",
    timeStamp: ""
  })
  const { address, isConnected } = useAccount();
  const { toast } = useToast();

  // ------------- UPLOAD TO NFT MINTING CONTRACT AND CHECK TRANSACTION SUCCESS \----------------------------------------
  const {
    writeContractAsync: uploadToCreateNFTcontract,
    data: CreateNFTData,
  } = useWriteContract();

  const {
    data: txCreateNFT,
    isSuccess: txCreateNFTsuccess
  } = useTransactionReceipt({ hash: CreateNFTData })

  // ------------- APPROVE THE NFT INTO THE MARKERTPLACE CONTRACT AND CHECK TRANSACTION SUCCESS --------------------------------
  const {
    writeContractAsync: approveNFT,
    data: approveNFTData,
  } = useWriteContract();

  const {
    data: txApproveNFt,
    isSuccess: txApproveNFTSuccess
  } = useTransactionReceipt({ hash: approveNFTData })



  // --------------- ADD MINTED NFT MARKETPLACE CONTRACT AND CHECK TRANSACTION SUCCESS ----------------------------------------
  const {
    writeContractAsync: AddNFTtoMarketPlaceContract,
    data: AddToMarketPlaceContractData
  } = useWriteContract();

  const {
    data: txAddToMaketplace,
    isSuccess: txAddToMaketplaceSuccess
  } = useTransactionReceipt({ hash: AddToMarketPlaceContractData })


  // ------------- THIS HOOK WILL LIST THE NFT WITH PRICE AND CHECK TRANSATION SUCCESS ON MARKEPLACE -------------------------
  const {
    writeContractAsync: ListNFTtoMarketPlaceContract,
    data: ListToMarketplaceData
  } = useWriteContract();

  const {
    data: txListToMaketplace,
    isSuccess: txListToMaketplaceSuccess,
    isError: txListToMaketplaceIsError,
    error: txListToMaketplaceError
  } = useTransactionReceipt({ hash: ListToMarketplaceData })


  // FUNCTION TO UPLOAD THE SELECTED IMAGE TO PINATA IPFS AND GENERATING A METADATA FILE FOR IT
  const uploadFiles = async () => {
    // THIS FUNCTIONS UPLOADS MULTIPLE FILES TO ONE GROUP TO PINATA IPFS.
    try {
      if (!files.length || !price || !royalties || !description) {
        toast({
          description: 'Please provide all details for the NFT 🖊️'
        })
        return;
      }
      setUploadButtonState({ state: "Uploading NFT Image...", disabled: true })
      const data = new FormData();
      files.forEach((file) => data.append("files", file));
      data.set("collection", address);
      data.set("price", price)
      data.set("name", name);
      data.set("description", description);
      data.set("royalties", royalties);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrls = await uploadRequest.json();
      setUrlList(ipfsUrls);
      setUploadButtonState({ state: "Mint NFT", disabled: false })
      toast({
        title: `Image Uploaded Successfully ✅`,
      })
    } catch (e) {
      console.error(e);
      setUploadButtonState({ state: "Mint NFT", disabled: false })

      toast({
        description: 'Image Could Not Be Uploaded 🛑'
      })
    }
  };

  // FUNCTION TO MINT THE METADATA TO NFT CONTRACT
  const uploadAndCreateNFT = async () => {
    setUploadButtonState({ state: "Minting your NFT...", disabled: true })

    await uploadToCreateNFTcontract({
      abi: NFTabi,
      address: NFTAddress,
      functionName: 'createNFTs',
      args: [[urlList[0]]]
    });
  }

  // CALCULATING PRICE BASED ON USER INPUT
  const calculatePrice = () => {
    if (!price || isNaN(price)) return 0;
    return (price * 0.99).toFixed(2);
  };

  // FILE SELECTION BY USER
  const handleFilesSelection = (event) => {
    if (event.target.files?.[0]) {
      setFiles(event.target.files?.[0])
    }
  };

  // REMOVING SELETED FILE BY USER
  const removeFile = () => {
    setFiles(null);
  };

  // FOR NOW ONLY ONE IMAGE CAN BE MINTED INTO THE CONTRACT AT A TIME, BATCH MINTING WILL BE DONE LATER.
  useEffect(() => {
    if (urlList.length > 0) {
      uploadAndCreateNFT();
    }
  }, [urlList])

  // CHECKING FOR SUCCESSFULL MINTING AND GETTING CREATE NFT EVENTS.
  useEffect(() => {
    if (!txCreateNFT || !txCreateNFTsuccess) return;
    if (!txCreateNFT.logs) return;

    const logs = parseEventLogs({
      abi: NFTabi,
      eventName: "NFTCreated",
      logs: txCreateNFT.logs
    })
    toast({
      title: `NFT Minted Successfully ✅`,
    })
    setMintEvent({ address: logs[0].address, tokenId: logs[0].args.tokenId.toString(), tokenURI: logs[0].args.tokenURI })
  }, [txCreateNFT, txCreateNFTsuccess]);


  // CHECKING FOR MINTED NFT SUCCESSFULLY ADDITION TO MARKETPLACE.
  useEffect(() => {
    if (!txAddToMaketplace || !txAddToMaketplaceSuccess) return;
    if (!txAddToMaketplace.logs) return;

    const logs = parseEventLogs({
      abi: MarketPlaceAbi,
      eventName: "ItemAdded",
      logs: txAddToMaketplace.logs
    })
    console.log(logs)
    setItemAddedEvent({
      itemId: logs[0].args.itemId.toString(),
      sender: logs[0].args.owner,
      nftContractAdd: logs[0].args.nftContract,
      tokenId: logs[0].args.tokenId,
      nftURI: logs[0].args.nftURI,
      price: logs[0].args.price,
      isListed: logs[0].args.isListed,
      timeStamp: logs[0].args.timestamp
    }
    )
    toast({
      title: `NFT Added Successfully to Marketplace ✅`,
    })

    if (price > 0) {

      setUploadButtonState({ state: "Listing NFT to the marketplace....", disabled: true })
      ListNFTtoMarketPlaceContract({
        abi: MarketPlaceAbi,
        address: MarketplaceAddress,
        functionName: 'listNFTWithNative',
        args: [logs[0].args.itemId, price],
        value: parseEther('0.5')
      })
    }

  }, [txAddToMaketplace, txAddToMaketplaceSuccess]);

  useEffect(() => {
    if (txListToMaketplace && txAddToMaketplaceSuccess) {
      const logs = parseEventLogs({
        abi: MarketPlaceAbi,
        eventName: "ItemListed",
        logs: txListToMaketplace.logs
      })
      console.log(logs)
      toast({
        title: `NFT Listed with ${price} 5ire to Marketplace ✅`,
      })
      setUploadButtonState({ state: "Approving NFT....", disabled: true })

      approveNFT({
        abi: NFTabi,
        address: NFTAddress,
        functionName: 'approve',
        args: [MarketplaceAddress, mintEvent.tokenId]
      })
    }

    if (txListToMaketplaceIsError) {
      console.log(txListToMaketplace)
    }
  }, [txListToMaketplace, txListToMaketplaceSuccess, txListToMaketplaceIsError, txListToMaketplaceError])


  useEffect(() => {
    if (!txApproveNFt || !txApproveNFTSuccess) return;

    toast({
      title: 'NFT approved and added to the marketplace. ✅'
    })
    setUploadButtonState({ state: "Mint NFT", disabled: false })


  }, [txApproveNFt, txApproveNFTSuccess])

  // ADDING THE ```NFT CONTRACT ADDRESS AND TOKEN ID``` TO MARKETPLACE CONTRACT AFTER SUCCESSFULL MINTING
  useEffect(() => {
    if (mintEvent.address && mintEvent.tokenId && mintEvent.tokenURI) {
      setUploadButtonState({ state: "Adding NFt to marketplace...", disabled: true })

      AddNFTtoMarketPlaceContract({
        abi: MarketPlaceAbi,
        address: MarketplaceAddress,
        functionName: 'addNFTtoMarketPlace',
        args: [mintEvent.address, mintEvent.tokenId]
      })
    }
  }, [mintEvent])


  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4">Create New NFT</h1>
        <div className="h-full w-full max-w-md bg-gray-800 border-gray-500 border rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <img
              src="https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png"
              alt="5ire Logo"
              className="w-8 h-8"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{truncateAddress(address)}</p>
            <p className="text-sm text-gray-400">5ireChain</p>
          </div>
          <p className={`text-sm font-medium ${address ? "text-green-500" : "text-red-500"}`}>
            {address ? "Connected" : "Not Connected"}
          </p>
        </div>

        {/* Multi File Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">Upload NFT File</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500 text-sm mb-2">PNG, GIF, WEBP, MP4, or MP3. Max 100mb.</p>
            <input type="file" onChange={handleFilesSelection} className="hidden" id="single-file-input" />
            <div className="flex gap-2 items-center justify-center">
              <label
                htmlFor="single-file-input"
                className="cursor-pointer bg-white hover:bg-slate-200 text-black py-2 px-4 rounded-lg">
                <span>{!files ? "Choose File" : files?.name}</span>
              </label>
              {files && (
                <button
                  onClick={removeFile}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm"
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-2">
            NFT Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="e.g. 2"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Card className="h-full sm:h-40 max-w-md bg-gray-800 border-gray-500 rounded-3xl py-5 text-small sm:text-base">
            <CardContent className="flex justify-between">
              <p className="text-gray-400">Price per edition</p>
              <p>{price || 0} 5IRE</p>
            </CardContent>
            <CardContent className="flex justify-between">
              <p className="text-gray-400">Marketplace Fee</p>
              <p> 1.0 %</p>
            </CardContent>
            <hr className="bg-white border-2"></hr>
            <CardContent className="flex justify-between">
              <p className="text-gray-400">You will receive</p>
              <p>{calculatePrice()} 5IRE</p>
            </CardContent>
          </Card>
        </div>
        {/* Collection Name Input */}
        {/* <div className="mb-6">
          <label htmlFor="collectionName" className="block text-sm font-medium text-gray-400 mb-2">
            Collection Name
          </label>
          <input
            id="collectionName"
            type="text"
            placeholder="e.g. 'Exclusive Art Collection'"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </div> */}
        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            NFT Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. 'A pink sheep'"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
            onChange={(e) => { setName(e.target.value) }}
          />
        </div>
        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            NFT Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="e.g. 'A digital art of a pink sheep made by John Doe'"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
            onChange={(e) => { setDescription(e.target.value) }}
          ></textarea>
        </div>
        {/* Royalties Input */}
        <div className="mb-6">
          <label htmlFor="royalties" className="block text-sm font-medium text-gray-400 mb-2">
            Royalties
          </label>
          <input
            id="royalties"
            type="number"
            placeholder="e.g. 10"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
            onChange={(e) => { setRoyalties(e.target.value) }}
          />
          <p className="text-gray-500 text-sm mt-2">Suggested: 0%, 10%, 20%, 30%. Maximum is 50%.</p>
        </div>
        {/* Upload Button */}
        {isConnected ?
          <button
            type="button"
            disabled={uploadButtonState.disabled}
            onClick={uploadFiles}
            className="w-full bg-white hover:bg-slate-200 text-black py-3 rounded-lg font-semibold mb-4 items-center flex justify-center gap-3"
          >
            {uploadButtonState.state}{uploadButtonState.disabled && <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent"></span>}
          </button>
          : <ConnectButton />
        }
      </div>
    </div>
  );
}