import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDLm1eNBZq_gcsYEIqLtu5hOY2CWi1Zx0",
    authDomain: "sign-in-1121b.firebaseapp.com",
    projectId: "sign-in-1121b",
    storageBucket: "sign-in-1121b.firebasestorage.app",
    messagingSenderId: "265083499036",
    appId: "1:265083499036:web:5743bdb690d88278ffe5d9",
    measurementId: "G-13PZYZ23HK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};


export const Logout = () => {
    return signOut(auth);
};

// export const registerWithEmail = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };
//
// export const loginWithEmail = async (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// };

export { onAuthStateChanged };