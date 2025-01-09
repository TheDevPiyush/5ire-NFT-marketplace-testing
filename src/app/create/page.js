"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardWithForm } from "./Card";
import { truncateAddress } from "@/lib/truncateAddress";
import { useAccount } from "wagmi";
export default function createNFTPage() {
  const [files, setFiles] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [price, setPrice] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { address } = useAccount();
  const uploadFiles = async () => {
    try {
      if (!files.length) {
        alert("No files selected");
        return;
      }
      setUploading(true);
      const data = new FormData();
      files.forEach((file) => data.append("files", file));
      data.set("collection", collectionName);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrls = await uploadRequest.json();
      setUrlList(ipfsUrls);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading files");
    }
  };
  // const handleFileChange = (e) => {
  //   if (e.target?.files) {
  //     setFiles(Array.from(e.target.files));
  //   }
  // };
  const calculatePrice = () => {
    if (!price || isNaN(price)) return 0;
    return (price * 0.99).toFixed(2);
  };
  const handleFilesSelection = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const removeFile = () => {
    setFiles(null);
  };
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
            <input type="file" multiple onChange={handleFilesSelection} className="hidden" id="single-file-input" />
            {
              files.length === 0 ?
                <label
                  htmlFor="single-file-input"
                  className="cursor-pointer bg-white hover:bg-slate-200 text-black py-2 px-4 rounded-lg">
                  Choose File
                </label>
                :
                <div>{files.length} <span>{files.length < 10 ? "file selected" : "files selected"}</span></div>
            }
            {selectedFile && (
              <div className="mt-4 flex items-center gap-2">
                <p className="text-green-400">{selectedFile.name}</p>
                <button
                  onClick={removeFile}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm"
                >
                  X
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-2">
            Price
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
        <div className="mb-6">
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
        </div>
        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. 'Redeemable Tiger logo with a cup'"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
          />
        </div>
        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="e.g. 'After purchasing, you'll be able to get the real cup'"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
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
            placeholder="e.g. 12"
            className="w-full bg-gray-700 text-white rounded-lg border border-gray-600 p-3"
          />
          <p className="text-gray-500 text-sm mt-2">Suggested: 0%, 10%, 20%, 30%. Maximum is 50%.</p>
        </div>
        {/* Upload Button */}
        <button
          type="button"
          disabled={uploading}
          onClick={uploadFiles}
          className="w-full bg-white hover:bg-slate-200 text-black py-3 rounded-lg font-semibold mb-4"
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
}