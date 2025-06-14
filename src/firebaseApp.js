
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyBghqNNvivco-pcyMdQj_r9xfcEITGbR2E",
  authDomain: "utv-edit-list.firebaseapp.com",
  databaseURL: "https://utv-edit-list-default-rtdb.firebaseio.com",
  projectId: "utv-edit-list",
  storageBucket: "utv-edit-list.appspot.com",
  messagingSenderId: "228703130523",
  appId: "1:228703130523:web:54701fd15afcdec5a3c73e",
  credential: true,
};


const app = initializeApp(firebaseConfig);
export default app