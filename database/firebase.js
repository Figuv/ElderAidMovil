import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqnqxT-dkbsS_6QuKQSoG81zcff8EURFk",
  authDomain: "atrevet-53dc6.firebaseapp.com",
  projectId: "atrevet-53dc6",
  storageBucket: "atrevet-53dc6.appspot.com",
  messagingSenderId: "443196752327",
  appId: "1:443196752327:web:db65860f73e30765db99e2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
