// firebase.service.ts
import * as firebase from "@/constants/firebase.config";
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: firebase.firebaseApiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

const auth = getAuth(app);

export default auth;
