"use client"
import LatestDrop from '@/components/LatestDrop';
import TableData from '@/components/TableData';
import { SearchContext } from '@/hooks/SearchContextHook';
import React, { useContext } from 'react'

export default function page() {
  const { searchQuery } = useContext(SearchContext);


  // ToDo : Fetch NFT here from Network and send to Component.
  // -------------------------
  
  // Random Dummy NFT and Table Data :

  const SampleNFTs = [
    {
      name: "Shimmering Owl #312",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeiamqpt7cu63n7bahj7h2nx6m77vmwo4r5onnrmqshp3qpwu32m2yi.ipfs.dweb.link%2F",
      user: "OwlEnthusiast",
      Price: "0.014 5ire"
    },
    {
      name: "Cyber Samurai #88",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeiblh5zuihp5uuil3ir23j4gblzds7sdkic6bm3ezpolur3zepdo3m.ipfs.dweb.link%2F",
      user: "BladeRunner",
      Price: "0.09 5ire"
    },
    {
      name: "Galactic Gecko #501",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeienkiqduxl4lfyqzl7qeq46ap6mr2qvvblqyn55z5mcahsitqxtuy.ipfs.w3s.link%2Fprereveal.gf.gif",
      user: "StarVox",
      Price: "0.0032 5ire"
    },
    {
      name: "Dragon Scale #7",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fcreator-hub-prod.s3.us-east-2.amazonaws.com%2Ford-alchemist_pfp_1735895236608.png",
      user: "MythicMaster",
      Price: "0.0025 5ire"
    },
    {
      name: "Ape Hustle #211",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fapechain%2FWOC71RNEaE4WFlvhixBQzp%252Ftg77fQSzDPjBnVW%252BltobvuUvG10wYVp2hdKfYcSja",
      user: "BigBanana",
      Price: "0.1 5ire"
    },
    {
      name: "Shimmering Owl #312",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeiamqpt7cu63n7bahj7h2nx6m77vmwo4r5onnrmqshp3qpwu32m2yi.ipfs.dweb.link%2F",
      user: "OwlEnthusiast",
      Price: "0.014 5ire"
    },
    {
      name: "Cyber Samurai #88",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeiblh5zuihp5uuil3ir23j4gblzds7sdkic6bm3ezpolur3zepdo3m.ipfs.dweb.link%2F",
      user: "BladeRunner",
      Price: "0.09 5ire"
    },
    {
      name: "Galactic Gecko #501",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fbafybeienkiqduxl4lfyqzl7qeq46ap6mr2qvvblqyn55z5mcahsitqxtuy.ipfs.w3s.link%2Fprereveal.gf.gif",
      user: "StarVox",
      Price: "0.0032 5ire"
    },
    {
      name: "Dragon Scale #7",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fcreator-hub-prod.s3.us-east-2.amazonaws.com%2Ford-alchemist_pfp_1735895236608.png",
      user: "MythicMaster",
      Price: "0.0025 5ire"
    },
    {
      name: "Ape Hustle #211",
      img: "https://img-cdn.magiceden.dev/autoquality:size:512000:20:80/rs:fill:640:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fapechain%2FWOC71RNEaE4WFlvhixBQzp%252Ftg77fQSzDPjBnVW%252BltobvuUvG10wYVp2hdKfYcSja",
      user: "BigBanana",
      Price: "0.1 5ire"
    }
  ];

  const sampleTableData = [
    {
      collection: "Galactic Geckos",
      floorPrice: "0.04 5ire",
      floorChange: "+12.5%",
      volume: "320 5ire",
      volumeChange: "+8.3%",
      items: "5.1K",
      owners: "2.4K"
    },
    {
      collection: "Cyber Samurai",
      floorPrice: "0.09 5ire",
      floorChange: "-3.2%",
      volume: "480 5ire",
      volumeChange: "+10%",
      items: "7.8K",
      owners: "3.2K"
    },
    {
      collection: "Pixel Apes",
      floorPrice: "0.15 5ire",
      floorChange: "+14.2%",
      volume: "680 5ire",
      volumeChange: "-2.1%",
      items: "10K",
      owners: "4.7K"
    },
    {
      collection: "Funky Frogs",
      floorPrice: "0.02 5ire",
      floorChange: "+25%",
      volume: "190 5ire",
      volumeChange: "+45%",
      items: "3.0K",
      owners: "1.2K"
    },
    {
      collection: "Neon Nights",
      floorPrice: "0.11 5ire",
      floorChange: "+4.9%",
      volume: "1.2K 5ire",
      volumeChange: "+12.5%",
      items: "6.4K",
      owners: "2.9K"
    },
    {
      collection: "Meta Mermaids",
      floorPrice: "0.03 5ire",
      floorChange: "-6.7%",
      volume: "210 5ire",
      volumeChange: "+2.1%",
      items: "2.2K",
      owners: "1.3K"
    },
    {
      collection: "Crypto Cats",
      floorPrice: "0.29 5ire",
      floorChange: "+32.1%",
      volume: "2.1K 5ire",
      volumeChange: "+18.2%",
      items: "4.9K",
      owners: "2.2K"
    },
    {
      collection: "Infinite Islands",
      floorPrice: "0.05 5ire",
      floorChange: "+9.1%",
      volume: "980 5ire",
      volumeChange: "+3.0%",
      items: "4.2K",
      owners: "1.8K"
    },
    {
      collection: "Pirate Punks",
      floorPrice: "0.07 5ire",
      floorChange: "-2.1%",
      volume: "540 5ire",
      volumeChange: "-10%",
      items: "3.3K",
      owners: "1.7K"
    },
    {
      collection: "Samurai Squirrels",
      floorPrice: "0.01 5ire",
      floorChange: "+1.1%",
      volume: "150 5ire",
      volumeChange: "+0.8%",
      items: "2.5K",
      owners: "1.1K"
    },
    {
      collection: "Degen Donkeys",
      floorPrice: "0.16 5ire",
      floorChange: "+18.3%",
      volume: "730 5ire",
      volumeChange: "+15.6%",
      items: "8.2K",
      owners: "3.6K"
    },
    {
      collection: "Mystic Mushrooms",
      floorPrice: "0.12 5ire",
      floorChange: "+2.0%",
      volume: "1.8K 5ire",
      volumeChange: "+6.5%",
      items: "9.4K",
      owners: "4.1K"
    },
    {
      collection: "Arcane Artifacts",
      floorPrice: "0.06 5ire",
      floorChange: "-3.9%",
      volume: "400 5ire",
      volumeChange: "+22%",
      items: "5.5K",
      owners: "2.3K"
    },
    {
      collection: "Ancient Aliens",
      floorPrice: "0.09 5ire",
      floorChange: "+14.0%",
      volume: "660 5ire",
      volumeChange: "+11.1%",
      items: "5.0K",
      owners: "2.2K"
    },
    {
      collection: "Blockchain Birds",
      floorPrice: "0.02 5ire",
      floorChange: "-4.2%",
      volume: "120 5ire",
      volumeChange: "-1.3%",
      items: "3.6K",
      owners: "1.4K"
    },
    {
      collection: "Cyber Dragons",
      floorPrice: "0.10 5ire",
      floorChange: "+27.5%",
      volume: "970 5ire",
      volumeChange: "+35%",
      items: "5.9K",
      owners: "2.7K"
    },
    {
      collection: "Pixelated Pirates",
      floorPrice: "0.05 5ire",
      floorChange: "+8.2%",
      volume: "510 5ire",
      volumeChange: "+2.9%",
      items: "4.4K",
      owners: "1.9K"
    },
    {
      collection: "Crypto Crows",
      floorPrice: "0.03 5ire",
      floorChange: "+11.0%",
      volume: "300 5ire",
      volumeChange: "+7.5%",
      items: "3.1K",
      owners: "1.5K"
    },
    {
      collection: "Orion Otters",
      floorPrice: "0.08 5ire",
      floorChange: "+5.4%",
      volume: "800 5ire",
      volumeChange: "+13%",
      items: "6.0K",
      owners: "2.5K"
    },
    {
      collection: "Savage Sharks",
      floorPrice: "0.11 5ire",
      floorChange: "-2.5%",
      volume: "1.1K 5ire",
      volumeChange: "+9.3%",
      items: "7.2K",
      owners: "3.2K"
    }
  ];

  return (
    <>
      <div className='w-full  mt-14  h-full'>

        <div className='m-5 py-3 border-[1px] border-muted rounded-lg'>
          <h1 className='m-7 font-bold text-3xl'>
            Latest Drops
          </h1>
          <LatestDrop NFTs={SampleNFTs} />
        </div>

        <div className='m-7 p-1 border-[1px] border-muted rounded-lg'>
          <h1 className='m-3 my-3  font-bold  text-3xl'>
            Trending Collections
          </h1>
          <TableData data={sampleTableData} />
        </div>

        <div className='m-5 py-3 border-[1px] border-muted rounded-lg'>
          <h1 className='m-7 font-bold text-3xl'>
            More For You
          </h1>
          <LatestDrop NFTs={SampleNFTs} />
        </div>


      </div >
    </>
  )
}
