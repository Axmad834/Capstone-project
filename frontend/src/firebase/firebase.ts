import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjwtM7vn8Y3QxloxRgmjOVXKe_U0M9c64",
  authDomain: "coaching-centre-ms-dev.firebaseapp.com",
  projectId: "coaching-centre-ms-dev",
  storageBucket: "coaching-centre-ms-dev.appspot.com",
  messagingSenderId: "12944843416",
  appId: "1:12944843416:web:bcd3b493fbae03614ba6ed",
  measurementId: "G-8NTH9CBSBY",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
