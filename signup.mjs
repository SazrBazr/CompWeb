import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Check if the user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, redirect to home
    window.location.href = "home.html";
  }
});

// Sign up event
document.getElementById("signup-btn").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      compliment: "Welcome! You are amazing!" // Default compliment
    });

    alert("Registration successful! Redirecting to home...");
    window.location.href = "home.html"; // Redirect to home page
  } catch (error) {
    alert(error.message);
  }
});