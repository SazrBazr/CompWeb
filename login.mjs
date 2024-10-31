import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your web app's Firebase configuration will be fetched from the server
let firebaseConfig;

// Fetch the configuration from the server
fetch('http://localhost:3000/api/config')  // Ensure this matches your server port
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        firebaseConfig = data; // Now you can use your Firebase configuration

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
    })
    .catch(error => console.error('Error fetching API key:', error));
