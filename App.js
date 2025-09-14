import { auth, provider, signInWithPopup, signOut, db } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const upgradeBtn = document.getElementById("upgradeBtn");
const authSection = document.getElementById("auth-section");
const userSection = document.getElementById("user-section");
const welcome = document.getElementById("welcome");
const progress = document.getElementById("progress");
const motivation = document.getElementById("motivation");

// Motivational messages
const messages = [
  "Every urge you beat makes you stronger 💪",
  "You are greater than your addiction ✨",
  "Discomfort is temporary, freedom is forever 🔑",
  "Day by day, you’re rewriting your story 📖",
  "Imagine how proud your future self will be 🌟"
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Calculate streak
function calculateDays(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = today - start;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Log in
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    welcome.textContent = `Welcome, ${user.displayName}`;
    authSection.style.display = "none";
    userSection.style.display = "block";

    // Check Firestore for quit date
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const quitDate = userSnap.data().quitDate;
      const days = calculateDays(quitDate);
      progress.textContent = `🔥 Streak: ${days} day(s) strong`;
    } else {
      // Save new quit date
      await setDoc(userRef, {
        quitDate: new Date().toISOString()
      });
      progress.textContent = "🔥 Streak: Day 1 - you’ve started your journey!";
    }

    motivation.textContent = getRandomMessage();
  } catch (error) {
    console.error(error);
  }
});

// Log out
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  authSection.style.display = "block";
  userSection.style.display = "none";
});

// Upgrade (Stripe)
upgradeBtn.addEventListener("click", () => {
  window.location.href = "https://buy.stripe.com/eVq00l1NX40qfeNbkh5EY08";
});
