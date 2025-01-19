# 5ire NFT Marketplace

A Next.js-based NFT Marketplace project, leveraging [Shadcn UI](https://ui.shadcn.com/docs/installation/next). This guide will help you get started quickly.

## Getting Started

1. **Clone the repository :**
   ```
   git clone https://github.com/5ire-tech/marketplace-app.git
   ```
2. **Move inside the project folder :**
   ```
   cd marketplace-app
   ```
3. **Install the required dependencies using `npm i`**

   ```
   npm i
   ```

   **Although the project is already equipped with compatible dependencies, if there are any version conflicts while installation, Kindly use `--force`**

   ```
   npm i --force
   ```

4. **Run the App on the developement server:**

   ```
   npm run dev
   ```

# Overview

## **Tech Stack**

- **Next.js**: A React framework used for building server-side rendered and statically generated web applications.
- **Wagmi + Viem**: Libraries for blockchain interaction, simplifying wallet connections and contract calls.
- **Pinata**: A service to store files on IPFS for decentralized storage.

## **Core Features**

- **Minting NFTs**: Upload images and metadata to IPFS, generate a metadata URI, and mint the NFT on-chain.
- **Listing & Unlisting**: Easily list owned NFTs for sale on the marketplace or remove them from listing.
- **Permissions & Approvals**: Manage approvals for NFT contracts to interact with the marketplace.
- **Buying NFTs**: Purchase NFTs that are listed on the marketplace.

## **How it Works**

### Uploading and Minting

- **Select NFT Details**: The user provides the NFT image, name, price, and description.
- **Upload to Pinata**: The file is uploaded to Pinata’s IPFS, ensuring decentralized storage of the NFT media.
- **Metadata URI Generation**: The application creates a metadata JSON with the NFT details, uploads it to Pinata, and obtains a metadata URI.
- **Minting the NFT**: The metadata URI is used to mint the NFT on the blockchain via a smart contract. All actions require the user’s wallet confirmation.

### Listing an NFT on the Marketplace

- **List for Sale**: Once minted or owned, the NFT can be listed by specifying the desired sale price.
- **Approve NFT**: once listed, the user must approve the marketplace contract to handle transfers of the NFT.
- **Wallet Confirmation**: The user confirms listing and approval confirmations using their wallet.

### Buying an NFT

- **Marketplace Listing**: A user can browse the marketplace to see all listed NFTs.
- **Purchase**: The buyer initiates the purchase transaction for the selected NFT.
- **Transaction**: Once the transaction is confirmed, ownership of the NFT is transferred to the buyer.

### Unlisting an NFT

- **Removal from Marketplace**: The owner can unlist their NFT from the marketplace from account/owned section.
- **Transaction Confirmation**: The user confirms the unlisting transaction with their wallet.

## **Current Features**

### Minting & Listing

- Users can create and mint a new NFT using the app, which automatically uploads the image and metadata to Pinata.
- Immediately after minting, the user can list the NFT for sale on the marketplace.

### Buying

- Users can purchase any NFT listed on the marketplace (provided they have sufficient funds).

### Royalty
- If a NFT is bought on the marketplace, a small portion of the sale price would be sent to the original creator as royalty fee.

### Listing Purchased NFTs

- If a user owns NFTs (by purchase or mint), they can choose to list them for sale on the marketplace from their account.

### Unlisting NFTs

- Owners can remove their NFTs from the marketplace, making them unavailable for purchase.
