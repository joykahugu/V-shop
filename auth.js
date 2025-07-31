import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDw7w9mK8-3B0Qo3IqLoE3dcS7L8yOZkrs",
  authDomain: "auth-1e482.firebaseapp.com",
  projectId: "auth-1e482",
  storageBucket: "auth-1e482.firebasestorage.app",
  messagingSenderId: "1019514298696",
  appId: "1:1019514298696:web:7a5d25aab591cdca7d537d",
  measurementId: "G-LFDWQQNKHC"
});


const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();



const logInForm = document.getElementById("login-form-container");
const googleSignin = document.getElementById("googleSignInButton");
const logIn = document.getElementById("sign-in-btn");
const statusMessage = document.getElementById("statusMessage");

if (logInForm) {
  addEventListener ('submit', (e) => {
    e.preventDefault();
    
    const email= logInForm.email.value;
    const password= logInForm.password.value

    signInWithEmailAndPassword(auth, email, password)
          then((userCredential) => {
    
    const user = userCredential.user;
   
  })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = "Invalid email or password. Please try again.";
                
                console.error(`Login Error (${errorCode}): ${error.message}`);

                statusMessage.textContent = errorMessage;
                statusMessage.className = 'text-sm text-center text-red-600 dark:text-red-400';
            });
    

  });
}