import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMFmZzbh38fXEXobmkwHCGi8lVIPHtdOw',
  authDomain: 'carbonawarenessapp.firebaseapp.com',
  projectId: 'carbonawarenessapp',
  storageBucket: 'carbonawarenessapp.firebasestorage.app',
  messagingSenderId: '992155699908',
  appId: '1:992155699908:web:1da9186a99c2ee5ff9d791',
  measurementId: 'G-RJEG4MHPYF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export necessary functions
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, doc, getDoc, setDoc };
