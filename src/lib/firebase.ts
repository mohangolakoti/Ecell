import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpN5JRasO0AUQwbVQ8QFJonE_VQdQXe10",
  authDomain: "lexicaar-b7f90.firebaseapp.com",
  projectId: "lexicaar-b7f90",
  storageBucket: "lexicaar-b7f90.appspot.com",
  messagingSenderId: "947523686788",
  appId: "1:947523686788:web:6d764c09bc93bfb5f24dd1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);