import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCmHX-ofSnqvWVfKf9FAbO6TKQCcHhglY",
  authDomain: "financepoint-aaua.firebaseapp.com",
  projectId: "financepoint-aaua",
  storageBucket: "financepoint-aaua.appspot.com",
  messagingSenderId: "954231940143",
  appId: "1:954231940143:web:56fed2ababbfb4dc9712da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user).then(() => {
          alert("Verification email sent!");
          signupForm.reset();
        });
      })
      .catch((error) => alert(error.message));
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          alert("Login successful!");
          window.location.href = "dashboard.html";
        } else {
          alert("Please verify your email before logging in.");
        }
      })
      .catch((error) => alert(error.message));
  });
}
