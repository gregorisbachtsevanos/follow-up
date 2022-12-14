import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD61KItxa73Tq0bLkeF1ol-R9j_bmrUGVY",
    authDomain: "follow-up-site.firebaseapp.com",
    projectId: "follow-up-site",
    storageBucket: "follow-up-site.appspot.com",
    messagingSenderId: "230396447253",
    appId: "1:230396447253:web:1a953adc15e65a015e5c1c"
};

// initialize firebase 
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore, timestamp, projectStorage }