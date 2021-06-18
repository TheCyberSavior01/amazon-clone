import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBb4l6a4mwsXSTEjsIsB6iPDdHozD89UI",
  authDomain: "clone-4e875.firebaseapp.com",
  projectId: "clone-4e875",
  storageBucket: "clone-4e875.appspot.com",
  messagingSenderId: "93160710620",
  appId: "1:93160710620:web:01ba628cd1a3a0f5afef19",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
