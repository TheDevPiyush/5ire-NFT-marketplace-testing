import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const collectionName = data.get("collection") as string;
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const royalties = Number(data.get("royalties"));
        const price = Number(data.get("price"));

        const file = data.get("file") as File | null;

        if (!collectionName || !file) {
            return NextResponse.json(
                { error: "Missing collection name or file" },
                { status: 400 }
            );
        }

        const createCollection = await pinata.groups.create({ name: collectionName });
        const groupId = createCollection.id;

        const gatewayBaseURL = "https://gateway.pinata.cloud/ipfs/";

        const { IpfsHash: imageHash } = await pinata.upload.file(file);

        const metadata = {
            name: name ?? "Item",
            description: description || "",
            royalties: royalties || 0,
            price: price || 0,
            image: `${gatewayBaseURL}${imageHash}`,
        };

        const metadataBlob = new Blob([JSON.stringify(metadata)], {
            type: "application/json",
        });
        const metadataFile = new File([metadataBlob], `${name}.json`, {
            type: "application/json",
        });

        const { IpfsHash: metadataHash } = await pinata.upload.file(metadataFile);

        await pinata.groups.addCids({
            groupId,
            cids: [imageHash, metadataHash],
        });

        const metaDataUrl = `${gatewayBaseURL}${metadataHash}`;

        return NextResponse.json({ metaDataUrl }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
