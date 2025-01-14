
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

        // 1) Create a new group/collection on Pinata
        const createCollection = await pinata.groups.create({ name: collectionName });
        const groupId = createCollection.id;

        const gatewayBaseURL = "https://gateway.pinata.cloud/ipfs/";

        // These arrays will hold the CIDs we need to add to the group
        // and the final metadata URLs we want to return
        const allCids: string[] = [];
        const metaDataUrls: string[] = [];

        // 2) Loop over each file, rename it, and upload
        for (let i = 0; i < files.length; i++) {
            const originalFile = files[i];

            // Derive the extension from the original file
            // If you're sure everything is .jpg, you can hardcode "jpg"
            const extension = originalFile.name.split(".").pop() || "jpg";
            const index = i + 1; // starting from 1

            // Rename the file to e.g., "1.jpg", "2.jpg", etc.
            const renamedFile = new File([originalFile], `${index}.${extension}`, {
                type: originalFile.type,
            });

            // 3) Upload the image to Pinata
            const { IpfsHash: imageHash } = await pinata.upload.file(renamedFile);

            // 4) Create a metadata object. You can customize the fields as needed.
            const metadata = {
                name: `${name ?? "Item"} #${index}`,
                description: description || "",
                royalties: royalties || 0,
                price: price || 0,
                // This points to the actual image on IPFS
                image: `${gatewayBaseURL}${imageHash}`,
            };

            // 5) Convert metadata object to JSON, and upload it as a .json file
            const metadataBlob = new Blob([JSON.stringify(metadata)], {
                type: "application/json",
            });
            const metadataFile = new File([metadataBlob], `${index}.json`, {
                type: "application/json",
            });

            const { IpfsHash: metadataHash } = await pinata.upload.file(metadataFile);

            // Add both the image and metadata CIDs to the group
            allCids.push(imageHash, metadataHash);

            // Collect the final gateway URL for the metadata .json
            metaDataUrls.push(`${gatewayBaseURL}${metadataHash}`);
        }

        // 6) Add all collected CIDs (images + metadata) to the Pinata group
        await pinata.groups.addCids({
            groupId,
            cids: allCids,
        });

        // 7) Return all the metadata JSON URLs
        return NextResponse.json(metaDataUrls, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
