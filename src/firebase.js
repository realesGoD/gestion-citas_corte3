// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCN5S0DV4Ive5Ii1-watRrLZqwgFttmrU",
  authDomain: "authmed.firebaseapp.com",
  projectId: "authmed",
  storageBucket: "authmed.firebasestorage.app",
  messagingSenderId: "61827389378",
  appId: "1:61827389378:web:b920d7df6be4ab293e685b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
