import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      document.getElementById("compliment").textContent = docSnap.data().compliment;
    } else {
      document.getElementById("compliment").textContent = "Hello! Your compliment awaits!";
    }
  } else {
    window.location.href = "login.html";
  }
});