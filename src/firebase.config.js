import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBo9a0ENb_n3wu7ux9Ma_pB7GiE2T1iqLc",
  authDomain: "imessage-clone-react-df7af.firebaseapp.com",
  projectId: "imessage-clone-react-df7af",
  storageBucket: "imessage-clone-react-df7af.appspot.com",
  messagingSenderId: "750440104957",
  appId: "1:750440104957:web:2006ea49a73c6e98bd8f94",
  measurementId: "G-QZ3918J0CC"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(),
   auth = firebase.auth(),
   storage = firebase.storage(),
   provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage,provider };