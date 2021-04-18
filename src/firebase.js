import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyA3QioYlpkJYT1Ln8pixYG_ETsxvYgFXgI',
  authDomain: 'finance-3418b.firebaseapp.com',
  projectId: 'finance-3418b',
  storageBucket: 'finance-3418b.appspot.com',
  messagingSenderId: '693716348304',
  appId: '1:693716348304:web:1dcff35bc7f5b13ab4d715',
  measurementId: 'G-59HCRNKC84'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const loansCollection = db.collection('loans')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  loansCollection,
  commentsCollection,
  likesCollection
}
