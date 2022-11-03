import firebase from 'firebase/compat/app'
import "firebase/compat/auth";

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQEo0aBj6UC-FMeV2FbUkDO71Gg4ljQj4",
  authDomain: "biddingcars-363616.firebaseapp.com",
  projectId: "biddingcars-363616",
  storageBucket: "biddingcars-363616.appspot.com",
  messagingSenderId: "578243658376",
  appId: "1:578243658376:web:6d384f19b163a47b60553d",
  measurementId: "G-G1PK01GE79"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}