import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAqrGjUFcbIJ4HPpgtQlgc_sWphGbD_VgY",
  authDomain: "robinhood-clone-72973.firebaseapp.com",
  projectId: "robinhood-clone-72973",
  storageBucket: "robinhood-clone-72973.appspot.com",
  messagingSenderId: "870323303798",
  appId: "1:870323303798:web:9d48f68de1230100d37657"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
