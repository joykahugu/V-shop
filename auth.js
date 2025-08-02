import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDw7w9mK8-3B0Qo3IqLoE3dcS7L8yOZkrs",
  authDomain: "auth-1e482.firebaseapp.com",
  projectId: "auth-1e482",
  storageBucket: "auth-1e482.firebasestorage.app",
  messagingSenderId: "1019514298696",
  appId: "1:1019514298696:web:7a5d25aab591cdca7d537d",
  measurementId: "G-LFDWQQNKHC"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();




const googleSignin = document.getElementById("googleSignInButton");
const logIn = document.getElementById("sign-in-btn");
const statusMessage = document.getElementById("statusMessage");
const userInfo = document.getElementById('user-info')

 googleSignin.addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
  .then(result => {
    const user = result.user;
    statusMessage.textContent= ("Logged In:", user.displayName);

  })
  .catch(error => {
    console.error("Login Failed: ", error.message);
  }

  )
})

onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.innerHTML = `
      <p><strong>Name:</strong> ${user.displayName}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <img src="${user.photoURL}" alt="Profile Picture" width="80">
    `;
  } else {
    userInfo.innerHTML = "<p>No user signed in</p>";
  }
});
