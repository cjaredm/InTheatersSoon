import firebase from "firebase";
import keys from "../.env";

const config = {
  apiKey: keys.firebaseKey,
  authDomain: "intheaterssoon-v1.firebaseapp.com",
  databaseURL: "https://intheaterssoon-v1.firebaseio.com",
  storageBucket: "intheaterssoon-v1.appspot.com"
};
firebase.initializeApp(config);
export default firebase;

export const auth = firebase.auth();

/*
// How to Read Data
const snapShot = firebase.database().ref('/users/').once('value');
const values = snapShot.val() && snapShot.val() === ({results: 'whatever you are getting'});

// How to Write
const writing = firebase.database()
  .ref(`/users/${userId}/savedMovies`)
  .set({movie: 'movie1'})
*/
