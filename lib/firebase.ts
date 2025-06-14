import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDzuPUbjDAsqMjVpTyidJMcBw5ZP5lVBiQ",
    authDomain: "guitourgn.firebaseapp.com",
    projectId: "guitourgn",
    storageBucket: "guitourgn.firebasestorage.app",
    messagingSenderId: "240587196994",
    appId: "1:240587196994:web:cfb3428db5990190e33bdb"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
