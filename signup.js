import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const signupForm = document.getElementById("register-form");
const statusMessage = document.getElementById("status-message");
const signupButton = document.getElementById("register-btn");

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return updateProfile(user, {
                displayName: username
            });
        })
        .then(() => {
            // Profile updated successfully, now redirect
            window.location.href = 'index.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                errorMessage = 'This email address is already in use by another account.';
            } else if (errorCode === 'auth/weak-password') {
                errorMessage = 'The password is too weak. Please use at least 6 characters.';
            } else if (errorCode === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }

            statusMessage.textContent = errorMessage;
            statusMessage.className = 'text-sm text-red-600 dark:text-red-400';
        });
})
