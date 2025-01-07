"use client";
import React from "react";
import { useAccount } from "wagmi";

export default function page() {

  const { account } = useAccount()

  return (
    <>
      <div>Your Profile : {account}</div>
    </>
  );
}
