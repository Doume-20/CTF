// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

// Your web app's Firebase configuration - This should ideally come from index.html or a config file
// For simplicity in this context, we will duplicate it here, but in a real app,
// you'd export 'auth' from the init script in index.html and import it here.

// UI Elements
const authSection = document.getElementById('auth-section');
const authForms = document.getElementById('auth-forms');
const userInfo = document.getElementById('user-info');
const displayUsername = document.getElementById('display-username');

const signupUsernameInput = document.getElementById('signup-username');
const signupPasswordInput = document.getElementById('signup-password');
const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
const signupButton = document.getElementById('signup-button');
const signupError = document.getElementById('signup-error');

const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');

const logoutButton = document.getElementById('logout-button');
n// Firebase App and Auth instances from global scope (initialized in index.html)
const { auth, db, doc, setDoc, getDoc } = window.firebaseAuth;

// Global array to store completed challenges for the current user
let completedChallenges = [];

// Function to update the UI based on completed challenges
function updateChallengeUI(challenges) {
    challenges.forEach(challengeId => {
        const flagInput = document.getElementById(`flag-${challengeId}`);
        const resultParagraph = document.getElementById(`result-${challengeId}`);
        if (flagInput) {
            flagInput.disabled = true; // Disable input
            flagInput.value = 'Flag Captured!'; // Set placeholder text
            flagInput.classList.add('completed-flag');
        }
        if (resultParagraph) {
            resultParagraph.textContent = '✅ Challenge Completed!';
            resultParagraph.style.color = 'lime';
        }
        // Find the parent button and disable it, and add a class to its parent section
        const checkButton = document.querySelector(`button[onclick="checkFlag('${challengeId}')"]`);
        if (checkButton) {
            checkButton.disabled = true;
            checkButton.textContent = 'Completed';
        }
        // Add 'completed' class to the entire challenge section for styling
        const challengeSection = flagInput ? flagInput.closest('section') : null;
        if (challengeSection) {
            challengeSection.classList.add('completed-section');
        }
    });
}

// Function to mark a challenge as completed in Firestore
async function markChallengeAsCompleted(userId, challengeId) {
    if (!userId || !challengeId) {
        console.error('User ID or Challenge ID is missing for marking completion.');
        return false;
    }
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { completedChallenges: { [challengeId]: true } }, { merge: true });
        console.log(`Challenge ${challengeId} marked as completed for user ${userId}`);
        // Add to local state and update UI immediately
        if (!completedChallenges.includes(challengeId)) {
            completedChallenges.push(challengeId);
            updateChallengeUI([challengeId]); // Update UI for this specific challenge
        }
        return true;
    } catch (error) {
        console.error('Error marking challenge as completed:', error);
        return false;
    }
}

// Function to get all completed challenges for a user from Firestore
async function getCompletedChallenges(userId) {
    if (!userId) {
        console.error('User ID is missing for getting completed challenges.');
        return [];
    }
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            if (data.completedChallenges) {
                return Object.keys(data.completedChallenges).filter(key => data.completedChallenges[key] === true);
            }
        }
        return [];
    } catch (error) {
        console.error('Error getting completed challenges:', error);
        return [];
    }
}

// Expose functions globally for solution.js to use
window.ctfFirebaseFunctions = {
    markChallengeAsCompleted,
    updateChallengeUI // Expose update UI as well if needed by other parts of the app
};


// Helper function to format username to email
const formatUsernameAsEmail = (username) => `${username}@ctf.com`; // Using a dummy domain

// Event Listeners
signupButton.addEventListener('click', async () => {
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value;
    const confirmPassword = signupConfirmPasswordInput.value;
    signupError.textContent = '';

    if (!username) {
        signupError.textContent = 'Please enter a username.';
        return;
    }
    if (!password || !confirmPassword) {
        signupError.textContent = 'Please fill in all password fields.';
        return;
    }
    if (password !== confirmPassword) {
        signupError.textContent = 'Passwords do not match.';
        return;
    }
    if (password.length < 6) {
        signupError.textContent = 'Password should be at least 6 characters.';
        return;
    }

    try {
        const email = formatUsernameAsEmail(username);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        console.log('User signed up and profile updated:', userCredential.user);
        // Clear form
        signupUsernameInput.value = '';
        signupPasswordInput.value = '';
        signupConfirmPasswordInput.value = '';
    } catch (error) {
        console.error('Sign up error:', error.code, error.message);
        signupError.textContent = `Sign up failed: ${error.message}`;
    }
});

loginButton.addEventListener('click', async () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;
    loginError.textContent = '';

    if (!username || !password) {
        loginError.textContent = 'Please fill in both username and password.';
        return;
    }

    try {
        const email = formatUsernameAsEmail(username);
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
        // Clear form
        loginUsernameInput.value = '';
        loginPasswordInput.value = '';
    } catch (error) {
        console.error('Login error:', error.code, error.message);
        loginError.textContent = `Login failed: ${error.message}`;
    }
});

logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log('User logged out');
    } catch (error) {
        console.error('Logout error:', error.code, error.message);
    }
});

// Auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        authForms.style.display = 'none';
        userInfo.style.display = 'block';
        displayUsername.textContent = user.displayName || user.email.split('@')[0];
    } else {
        // User is signed out
        authForms.style.display = 'block';
        userInfo.style.display = 'none';
    }
});