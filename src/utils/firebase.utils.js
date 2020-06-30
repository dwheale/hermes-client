import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBZ0xNlVv5knVvKmbS7FaCTLNG1cmd7ANI",
  authDomain: "whealetech-project-hermes.firebaseapp.com",
  databaseURL: "https://whealetech-project-hermes.firebaseio.com",
  projectId: "whealetech-project-hermes",
  storageBucket: "whealetech-project-hermes.appspot.com",
  messagingSenderId: "504930814239",
  appId: "1:504930814239:web:afa422c62b6b3229f7c82a",
  measurementId: "G-BHVML16FWN"
}

firebase.initializeApp(firebaseConfig)

export const functions = firebase.functions()
export const auth = firebase.auth()
export const db = firebase.firestore()


export default firebase