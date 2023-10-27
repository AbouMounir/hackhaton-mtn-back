//npm install firebase-tools

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKqi37icGwa01IB2AYLzQRu6tHGUsSqA4",
    authDomain: "hackathon-mtn.firebaseapp.com",
    projectId: "hackathon-mtn",
    storageBucket: "hackathon-mtn.appspot.com",
    messagingSenderId: "186837677488",
    appId: "1:186837677488:web:b9d047c646249664085275",
    measurementId: "G-5H6BT72P89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth





