import React from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const login = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: `${process.env.FIREBASE_APP_ID}.firebaseapp.com`,
    projectId: `${process.env.FIREBASE_APP_ID}`,
    storageBucket: `${process.env.FIREBASE_APP_ID}.appspot.com`,
    messagingSenderId: "178437899545",
    appId: "1:178437899545:web:6c9708d466234839d7f188",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  return (
    <div>
      <h1>login</h1>
      <button
        onClick={() => {
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken;
              auth.currentUser?.getIdToken().then((idToken) => {
                console.log(idToken);
              });

              // The signed-in user info.
              const user = result.user;
              console.log(user);

              // IdP data available using getAdditionalUserInfo(result)
              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }}
      >
        GOOOOGLEKKKKKKK
      </button>
    </div>
  );
};

export default login;
