export function truncateAddress(address, startChars = 10, endChars = 5) {
    if (!address) return "";
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
