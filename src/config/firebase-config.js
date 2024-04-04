import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';


// Use your own configs!
const firebaseConfig = {
    apiKey: "AIzaSyBc3A-r7omFimmvR4PV5QGgHkcHMxJQGWw",
    authDomain: "aution-b82cd.firebaseapp.com",
    projectId: "aution-b82cd",
    storageBucket: "aution-b82cd.appspot.com",
    messagingSenderId: "231596851530",
    appId: "1:231596851530:web:8fbd6f462cd664564541b3",
    measurementId: "G-8BK4E3G46H"
};

const app = firebase.initializeApp(firebaseConfig);

export const timestamp = () => firebase.firestore.FieldValue.serverTimestamp();
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();