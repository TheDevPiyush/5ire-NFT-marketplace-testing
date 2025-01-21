"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateAddress } from "@/lib/truncateAddress";
import { useAccount } from "wagmi";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from "@/utils/firebaseConfig";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/utils/supabaseClient'

export default function AccountLayout({ children, params }) {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const navItems = [
    { name: "My NFTs", path: `/account/${address}/owned` },
  ];


  const [userData, setUserData] = useState({ userName: "", profilePicUrl: "", email: "" })
  const [userInputName, setUserInputName] = useState(userData.userName || "");
  const [userInputEmail, setUserInputEmail] = useState(userData.email || "");
  const [selectedPic, setSelectedpic] = useState(null);
  const dialogCloseRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedpic(e.target.files[0])
    }
  }

  useEffect(() => {
    if (selectedPic) {
      uploadProfilePicture();
    }
  }, [selectedPic])

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'users', address);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({ userName: data.username, profilePicUrl: data.profilePicUrl, email: data.email });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
    if (!isConnected || !address) {
      redirect('/')
    }
    else if (pathname === `/account/${address}` || pathname === `/account/`) {
      redirect(`/account/${address}/owned`)
    }
  }, [address])

  const updateUserData = async () => {
    if (!userInputEmail || !userInputName) return;
    if (userInputName.length > 15) { toast({ title: "Username is too long 🐍" }); return };
    try {
      setLoading(true);
      const docRef = doc(db, "users", address);
      await updateDoc(docRef, {
        username: userInputName,
        email: userInputEmail
      });
      toast({ title: "Details Updated Successfully ✅" })
      setLoading(false);
      dialogCloseRef.current.click();
      fetchUserData();
    } catch (error) {
      toast({ title: "Couldn't update details, Please try again 🛑" })
      console.error("Error updating document:", error);
      setLoading(false);
    }
  }

  const uploadProfilePicture = async () => {
    if (!selectedPic) return;
    setLoading(true);
    const filePath = selectedPic.name;

    const { data, error } = await supabase.storage
      .from("profilePics")
      .upload(filePath, selectedPic, {
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      setLoading(false);
    } else {
      console.log("File uploaded!", data);
      toast({ title: "Profile Picture Uploaded ✅" })
      setSelectedpic(null);
      const { data: publicData } = supabase.storage
        .from("profilePics")
        .getPublicUrl(filePath);

      if (publicData?.publicUrl) {
        try {
          await updateDoc(doc(db, "users", address), {
            profilePicUrl: publicData.publicUrl,
          });
          toast({ title: "Profile Picture Updated for your account✅" })
          fetchUserData();
          setLoading(false);

        } catch (firestoreError) {
          console.error("Error updating Firestore:", firestoreError);
          toast({ title: "Couldn't update profile picture. Try Again 🛑" })
          setLoading(false);
        }
      }
    }
  }

  return (
    <div className="px-8">
      <div className="relative w-full bg-gray-700 h-[250px] group">
        <div className="overflow-hidden rounded-lg w-full h-full">
          <img className="w-full overflow-hidden" src={userData ? userData.profilePicUrl : ''} alt="" />
        </div>
        {!loading ?
          <label className="cursor-pointer overflow-hidden hover:brightness-75 transition-all object-fill absolute -bottom-8 left-4 rounded-full w-32 h-32 bg-black">
            <input onChange={handleFileChange} type="file" htmlFor='profilePic' className="hidden" />
            <img src={userData ? userData.profilePicUrl : ""} className="object-cover h-full w-full" alt="profilePic" />
          </label>
          :
          <label className="cursor-pointer overflow-hidden hover:brightness-75 transition-all object-fill absolute -bottom-8 left-4 rounded-full w-32 h-32 bg-black animate-pulse">
          </label>
        }
        <i htmlFor='profilePic' class="fa-solid absolute bottom-[-15px] left-28 text-4xl text-muted-foreground fa-circle-plus"></i>
      </div >

      <div className="mt-12 flex flex-col lg:flex-row justify-between">
        <div className="text-3xl gap-3 h-fit items-center justify-center flex">
          <div className="flex-col">
            <p>{userData ? userData.userName.length > 15 ? truncateAddress(userData.userName) : userData.userName : ""}</p>
            <p className="text-muted-foreground text-base">{userData && userData.email}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <i class="fa-duotone fa-light fa-pen-to-square text-lg bg-accent p-3 rounded-full cursor-pointer hover:scale-110 transition-transform" aria-hidden="true"></i>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Username
                  </Label>
                  <Input onChange={(e) => { setUserInputName(e.target.value) }} id="username" value={userInputName} placeholder={userData.userName ? userData.userName : "John Doe"} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Email Id
                  </Label>
                  <Input onChange={(e) => { setUserInputEmail(e.target.value) }} id="email" value={userInputEmail} placeholder={userData.email ? userData.email : "someone@5ire.org"} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => { updateUserData() }} disabled={loading} className="p-5 rounded-2xl" type="submit">
                  {loading ? "Saving...." : "Save Details"}
                </Button>
                <DialogClose ref={dialogCloseRef} className="hidden">
                  Close
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>


        <Card className="h-40 w-full sm:w-96 rounded-3xl py-5 text-small sm:text-base my-4">
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Followers</p>
            <p> 0</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Following</p>
            <p> 0</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p className="text-gray-500">Address</p>
            <p> {truncateAddress(address)}</p>
          </CardContent>
        </Card>
      </div>



      <nav className="text-lg">
        <div className="container flex">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`text-gray-300 hover:text-white px-3 py-2 ${pathname === item.path ? "border-b-2 border-white text-white font-bold" : ""
                    }`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="note text-muted-foreground gap-3 flex items-center justify-start my-3 text-base">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          If you want to approve a listed NFT for transactions, Please Un-list and List again, with necessary confirmation from wallet.
        </div>
      </nav>
      {children}
    </div >
  );
}
