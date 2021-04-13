import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";


const config = {
  apiKey: "AIzaSyAI03-fyA8nbeBOy6DSoH4yM851Da8kD3Y",
  authDomain: "react-app-685cd.firebaseapp.com",
  databaseURL: "https://react-app-685cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-app-685cd",
  storageBucket: "react-app-685cd.appspot.com",
  messagingSenderId: "790089265375",
  appId: "1:790089265375:web:22b09143880558b1a3b96a"
};

firebase.initializeApp(config);

export default firebase.database();
export const auth = firebase.auth();
