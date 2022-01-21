import firebase from "firebase/compat/app"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyA0g373D0YX4heRjca3tjf-G7S3h6C5sto",
    authDomain: "musical-world-v2.firebaseapp.com",
    projectId: "musical-world-v2",
    storageBucket: "musical-world-v2.appspot.com",
    messagingSenderId: "339593018101",
    appId: "1:339593018101:web:e97f387b7408bdf4d163bc"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();