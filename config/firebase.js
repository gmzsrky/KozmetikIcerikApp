import * as firebase from 'firebase';

import 'firebase/firestore';


try {
  firebase.initializeApp({
    apiKey: "AIzaSyB9A2CiBRXGkKPh59kEqCnsMA_6Hm2LBVw",
    authDomain: "toxicngredient.firebaseapp.com",
    projectId: "toxicngredient",
    storageBucket: "toxicngredient.appspot.com",
    messagingSenderId: "13130050110",
    appId: "1:13130050110:web:444882da7945e4b3ffbf6f",
    measurementId: "G-48MW44SK4M"
  })
  } catch (err) {
  // we skip the “already exists” message which is
  // not an actual error when we’re hot-reloading
  if (!/already exists/.test(err.message)) {
  console.error( err.stack)
  }}
  const Firebase= firebase;


export default Firebase