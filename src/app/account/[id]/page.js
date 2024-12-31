"use client"
import { useWallet } from '@/hooks/WalletConnectHook'
import React from 'react'

export default function page() {

  const { walletAddress } = useWallet();

  return (
    <div>
      Your account : {walletAddress}
    </div>
  )
}
