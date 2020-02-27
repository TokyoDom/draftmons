import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyCSPf2DhPVgR-wDkP8VSxd3UIRsKbR_6g8",
  authDomain: "testbase-e42de.firebaseapp.com",
  databaseURL: "https://testbase-e42de.firebaseio.com",
  projectId: "testbase-e42de",
  storageBucket: "testbase-e42de.appspot.com",
  messagingSenderId: "1061901215194",
  appId: "1:1061901215194:web:5222c8f71326bcb8c80ce3",
  measurementId: "G-5GRHZ32Q1X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;