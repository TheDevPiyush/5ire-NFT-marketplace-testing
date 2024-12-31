"use client";

import { useEffect } from "react";
import { BrowserProvider } from "ethers";
import { useWallet } from "@/hooks/WalletConnectHook";

export default function WalletConnect() {
    const { walletAddress, updateWalletAddress } = useWallet();

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new BrowserProvider(window.ethereum);

                await provider.send("eth_requestAccounts", []);

                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                updateWalletAddress(address);
            } catch (err) {
                console.error("Error connecting to wallet:", err);
            }
        } else {
            alert("MetaMask is not installed. Please install MetaMask to use this app.");
        }
    };

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            const handleAccountsChanged = (accounts) => {
                alert("Account Changed");
                if (accounts.length > 0) {
                    updateWalletAddress(accounts[0]);
                } else {
                    updateWalletAddress(null);
                }
            };

            window.ethereum.on("accountsChanged", handleAccountsChanged);

            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
    }, [updateWalletAddress]);

    return (
        <div>
            {!walletAddress ? (
                <button
                    onClick={connectWallet}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <p style={{ fontWeight: "bold" }}>{walletAddress}</p>
                </div>
            )}
        </div>
    );
}
