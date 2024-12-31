export function truncateAddress(address, startChars = 9, endChars = 4) {
    if (!address) return "";
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
