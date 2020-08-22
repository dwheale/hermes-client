import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCHR28_dQGeB-PnL9jn6gIC0tolrVo78as",
  authDomain: "whealetech-project-hermes.firebaseapp.com",
  databaseURL: "https://whealetech-project-hermes.firebaseio.com",
  projectId: "whealetech-project-hermes",
  storageBucket: "whealetech-project-hermes.appspot.com",
  messagingSenderId: "504930814239",
  appId: "1:504930814239:web:85cd28f17a449a50f7c82a",
  measurementId: "G-QL91DXNE4W"
}

firebase.initializeApp(firebaseConfig)

export const functions = firebase.functions()
export const auth = firebase.auth()
export const db = firebase.firestore()


export default firebase