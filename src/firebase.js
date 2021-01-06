import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1OKADO-GsCn6K3SgkGY4jC_bC66OERmE",
    authDomain: "ecommerce-19d24.firebaseapp.com",
    projectId: "ecommerce-19d24",
    storageBucket: "ecommerce-19d24.appspot.com",
    messagingSenderId: "1071079575925",
    appId: "1:1071079575925:web:37ecb9247ce6ae7a66433c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()