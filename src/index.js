import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore';
import { initializeApp } from  "firebase/app";

//'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';


const firebaseConfig = {
  apiKey: 'AIzaSyA9rGSbWErG6_5bcrrefsvsieX8rv3Cl9M',
  authDomain: 'cartify-8da0e.firebaseapp.com',
  projectId: 'cartify-8da0e',
  storageBucket: 'cartify-8da0e.appspot.com',
  messagingSenderId: '1022882199521',
  appId: '1:1022882199521:web:7cef92b5f6bec1c64384a0',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

ReactDOM.render(<App />, document.getElementById('root'));
