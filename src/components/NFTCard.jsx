export default function NFTCard({ nft }) {
    return (
        <div>
            <img src={nft.image} alt={nft.name} />
            <h2>{nft.name}</h2>
            <p>Price: {nft.price} ETH</p>
            <button>Buy Now</button>
        </div>
    );
}
