// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcdc_Dz9myRLw50zSsEB4RFLbumctWsDA",
    authDomain: "simple-form-with-firebase-auth.firebaseapp.com",
    projectId: "simple-form-with-firebase-auth",
    storageBucket: "simple-form-with-firebase-auth.appspot.com",
    messagingSenderId: "688645597800",
    appId: "1:688645597800:web:432b4b175066290dc8e9dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;