import { ethers } from "ethers";
import FireNFTMarketplaceABI from "./FireNFTMarketPlace.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS";

export const getContract = (provider) => {
    return new ethers.Contract(contractAddress, FireNFTMarketplaceABI.abi, provider);
};

export const getSignerContract = (provider) => {
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, FireNFTMarketplaceABI, signer);
};
