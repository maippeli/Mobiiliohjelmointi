import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyClIkbeyiTCpv68TGa6V48lnK_gNM7TbLc",
    authDomain: "ostoslista3-331c3.firebaseapp.com",
    databaseURL: "https://ostoslista3-331c3-default-rtdb.europe-west1.firebasedatabase.app/", 
    projectId: "ostoslista3-331c3",
    storageBucket: "ostoslista3-331c3.appspot.com",
    messagingSenderId: "251095689480",
    appId: "1:251095689480:web:45755128198339bef3e4bd",
    measurementId: "G-VL9W2V9HG8"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database, ref, push, onValue, remove, set };