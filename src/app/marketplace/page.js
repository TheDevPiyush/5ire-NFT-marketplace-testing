"use client"
import LatestDrop from '@/components/LatestDrop'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function page() {

  const [sortOrder, setSortOrder] = useState('Latest NFTs');

  return (
    <div className="w-full h-full">
      <h1 className='font-bold m-2 text-3xl flex justify-start'>
        Explore The Markeplace
      </h1>
      <Button className="m-4 p-6 font-bold text-lg" onClick={() => { sortOrder === "Latest NFTs" ? setSortOrder('Oldest NFTs') : setSortOrder('Latest NFTs') }} variant="secondary">
        {sortOrder} <i class={`fa fa-arrow-${sortOrder === "Latest NFTs" ? "up" : "down"}`} aria-hidden="true"></i>
      </Button>
      <div className='py-3 border-[1px] border-muted rounded-lg'>
        <LatestDrop sortOrder={sortOrder} scrollable={true} />
      </div>
    </div>
  )
}
