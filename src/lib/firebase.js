import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config={
  apiKey: "AIzaSyA3c6ZZO9mbCxx9IzZfUwjn9UKCy6YbHmI",
  authDomain: "instagram-c74d4.firebaseapp.com",
  projectId: "instagram-c74d4",
  storageBucket: "instagram-c74d4.appspot.com",
  messagingSenderId: "454552469683",
  appId: "1:454552469683:web:9fc83aef3e2d598402f0c6"
};

const firebase= Firebase.initializeApp(config);
const {FieldValue}= Firebase.firestore;


export {firebase, FieldValue};