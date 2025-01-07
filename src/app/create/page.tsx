
// Client-Side Code
"use client";

import React, { useState } from "react";

export default function page() {
    const [files, setFiles] = useState<File[]>([]);
    const [urlList, setUrlList] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [collectionName, setCollectionName] = useState("");

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className="w-full bg-red-400">
            <input
                type="text"
                className="bg-accent"
                name="collectionName"
                placeholder="Collection Name"
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />
            <button type="button" disabled={uploading} onClick={uploadFiles}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            <ul>
                {urlList.map((url, index) => (
                    <li key={index}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
                ))}
            </ul>
        </div>
    );
}
