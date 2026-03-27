/* ====================================================
   KiruKi - Firebase 設定
   ==================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyACfQj2Sz3eM6Y18_28f1PaDb_xHgRxzi8",
  authDomain: "kiruki-3fa3a.firebaseapp.com",
  databaseURL: "https://kiruki-3fa3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kiruki-3fa3a",
  storageBucket: "kiruki-3fa3a.firebasestorage.app",
  messagingSenderId: "556194867911",
  appId: "1:556194867911:web:6ed8901db2ac647217ace2",
  measurementId: "G-MDVPXFKQZ3"
};

firebase.initializeApp(firebaseConfig);
const fbAuth = firebase.auth();
const fbDb  = firebase.database();
