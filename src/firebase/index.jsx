import firebase from "firebase/app";
import "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCQWkJDyCjRyPs40HcxCliDfEHPWlw_-Qo",
  authDomain: "coder-484e0.firebaseapp.com",
  projectId: "coder-484e0",
  storageBucket: "coder-484e0.appspot.com",
  messagingSenderId: "160300116551",
  appId: "1:160300116551:web:0830633324f8f1eec89f62"
});
export const getFirebase = () => {
  return app;
};
export const getFirestore = () => {
  return firebase.firestore(app);
};
