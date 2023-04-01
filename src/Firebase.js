import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8u57hOV06LLQoDYcViqStNsQGjTIRqzU",
  authDomain: "where-is-waldo-41893.firebaseapp.com",
  projectId: "where-is-waldo-41893",
  storageBucket: "where-is-waldo-41893.appspot.com",
  messagingSenderId: "1092543327720",
  appId: "1:1092543327720:web:fa07e5136cb52c4c32885d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

//Secured by the highly effective algorithm of trust --please no hack
