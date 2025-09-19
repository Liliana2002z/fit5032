// /src/firebase/init.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 你的 Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyAmH8DzX_lx1idpWtM64VEVgNFddfrh5Iw",
  authDomain: "week7-xiaoqian.firebaseapp.com",
  projectId: "week7-xiaoqian",
  storageBucket: "week7-xiaoqian.firebasestorage.app",
  messagingSenderId: "805282837107",
  appId: "1:805282837107:web:690f8d645ecb1c58c1f006"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };