
    import {getFirestore, SetDoc, Doc} from  "https://www.gstatic.com/firebasejs/10.13.1/firestore.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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

  function showMessage(message, divId){
    var messageDiv=document.getElementsById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
    
  }

  const signUp=document.getElementById('submitSignUp');
  signup.addEventListener('click',(event)=> {
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created', 'signUpMessage');
        const docRef=doc(db,"users",user.uid);
        SetDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document ",error);
          }
        );

    })
    .catch((error)=>{
        const errorcode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email already in use', 'signUpMessage');
        }
        else{
            showMessage('unable to create User','signUpMessage'); 
        }
    })
  });
 
  const signIn=document.getElementById('submitSignIn')
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user =userCredential.user;
        localStorage.setItem('LoggedInUserId',user.uid);
        window.location.href='homepage.html';
    })
    .catch ((error)=>{
        const errorcode=error.code;
        if (errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password','signInMessage');
        }
        else{
            showMessage('Account does not exist','signInMessage')
        }
    })
    
  });