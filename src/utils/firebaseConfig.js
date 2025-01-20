import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// use your firebase config file from firebase console here : 

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "firechain-nft-marketplace.firebaseapp.com",
    projectId: "firechain-nft-marketplace",
    storageBucket: "firechain-nft-marketplace.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
    appId: process.env.FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };