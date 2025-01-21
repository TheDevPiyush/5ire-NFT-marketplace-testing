
// API Route Code
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
        const files = data.getAll("files") as File[];

        if (!collectionName || files.length === 0) {
            return NextResponse.json(
                { error: "Missing collection name or files" },
                { status: 400 }
            );
        }

        const createCollection = await pinata.groups.create({ name: collectionName });
        const groupId = createCollection.id;

        const gatewayBaseURL = "https://gateway.pinata.cloud/ipfs/";

        const allCids: string[] = [];
        const metaDataUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const originalFile = files[i];

            const { IpfsHash: imageHash } = await pinata.upload.file(originalFile);

            const metadata = {
                name: `${name ?? "Item"}`,
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

            allCids.push(imageHash, metadataHash);

            metaDataUrls.push(`${gatewayBaseURL}${metadataHash}`);
        }

        await pinata.groups.addCids({
            groupId,
            cids: allCids,
        });

        return NextResponse.json(metaDataUrls, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
