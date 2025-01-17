"use client"
import { useNFTContext } from '@/hooks/useNFTcontext';

import { DiscAlbum } from 'lucide-react'
import React, { useContext } from 'react'

export default function page() {

  const { NFTs, loading, error, refetch } = useNFTContext();

  return (
    loading ? <div>loading....</div>
      :
      <>
        {NFTs.map((item) => (
          <div>
            {item.owner}
          </div>
        ))}
      </>
  )
}

