"use client"
import WalletConnect from '@/components/WalletConnect'
import { SearchContext } from '@/hooks/SearchContextHook';
import React, { useContext } from 'react'



export default function page() {
  const { searchQuery } = useContext(SearchContext);

  return (
    <>
      <div>
        <h1 className='font-medium text-[24px]'>
          HELLO
          <p>Search Query: {searchQuery}</p>
        </h1>
      </div>
    </>
  )
}
