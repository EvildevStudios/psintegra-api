const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBfSIgC3Iq8EfZw6QkooxmP760MfW4-jXU",
    authDomain: "psintegra-firebase.firebaseapp.com",
    projectId: "psintegra-firebase",
    storageBucket: "psintegra-firebase.appspot.com",
    messagingSenderId: "931770628391",
    appId: "1:931770628391:web:e38bbb5a0430ee7d559102",
    measurementId: "G-TX60ZZM86K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

module.exports = { app, auth, storage, db };