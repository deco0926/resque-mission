// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ 這是你提供的專案設定，直接貼上沒問題
const firebaseConfig = {
  apiKey: "AIzaSyDExDKaMb3mh86nf6SxidtN6ciuv2viHh0",
  authDomain: "resque-mission.firebaseapp.com",
  projectId: "resque-mission",
  storageBucket: "resque-mission.firebasestorage.app",
  messagingSenderId: "1054389687593",
  appId: "1:1054389687593:web:5ce241d47aba42c20a9338",
  measurementId: "G-KPZV3FKRGQ"
};

// ✅ 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// ✅ 初始化 Firestore（這才是你用來存資料的）
const db = getFirestore(app);

export { db };
