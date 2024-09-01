import {getFirestore, getDoc, Doc} from  "https://www.gstatic.com/firebasejs/10.13.1/firestore.js";
import { getAuth, onAuthStateChanged ,SignOut} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCV9hG8ahFkiRnHuxd3uB0a2vRBI1M3aGs",
    authDomain: "login-page-ef1c0.firebaseapp.com",
    projectId: "login-page-ef1c0",
    storageBucket: "login-page-ef1c0.appspot.com",
    messagingSenderId: "381838744103",
    appId: "1:381838744103:web:405b6c00fc81ad23c1cc02"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth,(user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
            }
            else{
                console.log("no document found matching Id")
            }
        })
        .catch((error)=>{
            console.log("error");
        })
    }
    else{
        console.log("user id not found")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    SignOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.log(error)
    })
  })