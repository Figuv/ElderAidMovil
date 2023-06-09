import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaCozIRmw8Bh00FChsdNp8oMwdQAGwjco",
  authDomain: "elderaid-ea84c.firebaseapp.com",
  // databaseURL: "https://elderaid-ea84c-default-rtdb.firebaseio.com/",
  projectId: "elderaid-ea84c",
  storageBucket: "elderaid-ea84c.appspot.com",
  messagingSenderId: "457961259140",
  appId: "1:457961259140:web:002f224fd782a3585a42d1"
};

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   // databaseURL: "https://elderaid-ea84c-default-rtdb.firebaseio.com/",
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
