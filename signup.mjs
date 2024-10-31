import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
        
        // Initialize Firestore
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
                // Create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Add user to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                    // Add any additional user fields here
                });

                // Redirect to home page
                window.location.href = "home.html";
            } catch (error) {
                alert(error.message);
            }
        });
    })
    .catch(error => console.error('Error fetching API key:', error));
