import { auth, provider, signInWithPopup, signOut } from "./firebase.js";

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

// Sign up / log in
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    welcome.textContent = `Welcome, ${user.displayName}`;
    authSection.style.display = "none";
    userSection.style.display = "block";
    motivation.textContent = getRandomMessage();
    progress.textContent = "Day 1: You’ve started your journey!";
  } catch (error) {
    console.error(error);
  }
});

// Sign out
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  authSection.style.display = "block";
  userSection.style.display = "none";
});

// Upgrade to Pro (Stripe)
upgradeBtn.addEventListener("click", () => {
  window.location.href = "https://buy.stripe.com/eVq00l1NX40qfeNbkh5EY08";
});
