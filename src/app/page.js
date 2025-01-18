"use client"
import LatestDrop from '@/components/LatestDrop';
import TableData from '@/components/TableData';
import React, { useState } from 'react'
import _abiNFT from '@/utils/FireNFTToken.json'
import _abiMarketPlace from '@/utils/FireNFTMarketPlace.json'
import { Button } from '@/components/ui/button';
export default function page() {

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
  const [sortOrder, setSortOrder] = useState('Latest NFTs');

  return (
    <>
      <div className='w-full h-full'>
        <h1 className='font-bold m-2 text-3xl flex justify-start'>
          Latest Drops on 5ireChain
        </h1>
        <Button className="mx-3 my-2 font-bold" onClick={() => { sortOrder === "Latest NFTs" ? setSortOrder('Oldest NFTs') : setSortOrder('Latest NFTs') }} variant="secondary">
          {sortOrder} <i class={`fa fa-arrow-${sortOrder === "Latest NFTs" ? "up" : "down"}`} aria-hidden="true"></i>
        </Button>
        <div className='py-3 border-[1px] border-muted rounded-lg'>
          <LatestDrop sortOrder={sortOrder} />
        </div>

        <h1 className='my-3  font-bold  text-3xl'>
          Trending Collections (SAMPLE DATA)
        </h1>
        <div className='p-1 border-[1px] border-muted rounded-lg'>
          <TableData data={sampleTableData} />
        </div>

      </div >
    </>
  )
}
