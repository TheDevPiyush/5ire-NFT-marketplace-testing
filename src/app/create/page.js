
// Client-Side Code
"use client";

import React, { useState } from "react";
import { CollectionCard } from "./Card";
import { useToast } from "@/hooks/use-toast";

export default function page() {

    const { toast } = useToast();

    const [files, setFiles] = useState([]);
    const [urlList, setUrlList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const uploadFiles = async () => {
        try {
            if (!files.length) {
                toast({
                    description: 'No files selected 📂'
                })
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
            toast({
                description: 'There was some problem uploading your Collection ☹️'
            })
        }
    };

    const handleFileChange = (e) => {
        if (e.target?.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (


        // ----------------------------------------------------------------
        // TO DO: COMPLETE UI OF THIS PAGE

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // COMPLETED : UPLOAD TO A COLLECTION IS NOW SET UP USING PINATA
        // ----------------------------------------------------------------

        <div className="w-full h-full">
            <CollectionCard
                collectionName={collectionName}
                setCollectionName={setCollectionName}
                file={files}
                setFile={setFiles}
                onSubmit={uploadFiles}
            />

        </div>
    );
}
