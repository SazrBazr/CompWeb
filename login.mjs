import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzVUFQM-GT_Pxk1m8KHGyE2lfX4Fkihek",
  authDomain: "notiapp-ff8b0.firebaseapp.com",
  projectId: "notiapp-ff8b0",
  storageBucket: "notiapp-ff8b0.firebasestorage.app",
  messagingSenderId: "259790595328",
  appId: "1:259790595328:web:d3d455adeb81a413217fe5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Check if the user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, redirect to home
    window.location.href = "home.html";
  }
});

// Login event
document.getElementById("login-btn").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html"; // Redirect to home page
  } catch (error) {
    alert(error.message);
  }
});