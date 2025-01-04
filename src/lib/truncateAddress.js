export function truncateAddress(address, startChars = 7, endChars = 4) {
  if (!address) return "";
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
