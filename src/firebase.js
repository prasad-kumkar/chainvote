import 'firebase/auth'
import 'firebase/firestore'
import { firebase } from '@firebase/app'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyCb9KG9HGBZx0YJRsaF9JSd849fsyfiyxo",
    authDomain: "wyvote-934c2.firebaseapp.com",
    projectId: "wyvote-934c2",
    storageBucket: "wyvote-934c2.appspot.com",
    messagingSenderId: "234637567725",
    appId: "1:234637567725:web:fa1114b0d41ba1ae670ee4",
    measurementId: "G-WWV72GVDCQ"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const ballotsCollection = db.collection('ballots')


// export utils/refs
export {
  db,
  auth,
  usersCollection,
  ballotsCollection,
}