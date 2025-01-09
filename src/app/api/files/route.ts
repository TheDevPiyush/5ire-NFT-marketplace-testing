
// API Route Code
import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const collectionName = data.get("collection") as string;
        const files = data.getAll("files") as File[];

        if (!collectionName || files.length === 0) {
            return NextResponse.json({ error: "Missing collection name or files" }, { status: 400 });
        }

        const createCollection = await pinata.groups.create({ name: collectionName });
        const groupId = createCollection.id;
        
        const ipfsHashes = await Promise.all(
            files.map(async (file) => {
                const uploadData = await pinata.upload.file(file);
                return uploadData.IpfsHash;
            })
        );

        const urls = await Promise.all(
            ipfsHashes.map(async (hash) => pinata.gateways.convert(hash))
        );

        await pinata.groups.addCids({
            groupId,
            cids: ipfsHashes,
        });

        return NextResponse.json(urls, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
