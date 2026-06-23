import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamforgeai.firebaseapp.com",
  projectId: "authexamforgeai",
  storageBucket: "authexamforgeai.firebasestorage.app",
  messagingSenderId: "329328076766",
  appId: "1:329328076766:web:7166e15274160893f7df4f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Force account chooser so users can pick a Google account each time
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, provider };