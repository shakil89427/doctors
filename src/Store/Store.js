import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import doctors from "../Data/data.json";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../FirebaseConfig/firebaseConfig";

initializeApp(firebaseConfig);

const Store = () => {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  });

  return {
    user,
    doctors,
    googleSign,
  };
};

export default Store;
