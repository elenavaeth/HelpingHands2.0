import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGoXGtTJ7LyI8LJn_lWBCyH8VAklo6wfU",
    authDomain: "helpinghands-51fd8.firebaseapp.com",
    databaseURL: "https://helpinghands-51fd8-default-rtdb.firebaseio.com",
    projectId: "helpinghands-51fd8",
    storageBucket: "helpinghands-51fd8.appspot.com",
    messagingSenderId: "617193786140",
    appId: "1:617193786140:web:7e6d2fe619f2e1305708d9",
    measurementId: "G-THH445L87J"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db