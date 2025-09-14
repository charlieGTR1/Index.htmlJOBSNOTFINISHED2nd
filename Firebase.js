// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8XSobMjOQFXx31j4vxvO-jVKKzrMfSvI",
  authDomain: "quitanything.firebaseapp.com",
  projectId: "quitanything",
  storageBucket: "quitanything.firebasestorage.app",
  messagingSenderId: "666979431544",
  appId: "1:666979431544:web:97e5fb29eed1b0a1afe98d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
