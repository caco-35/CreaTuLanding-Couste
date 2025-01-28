// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlcnKjgxLu2Pf6auwAAwVKdKBUWwg2jQo",
    authDomain: "tienda-online-2025.firebaseapp.com",
    projectId: "tienda-online-2025",
    storageBucket: "tienda-online-2025.firebasestorage.app",
    messagingSenderId: "324659145476",
    appId: "1:324659145476:web:aec0fd0029d3b7e7193e51"
  };

  const app = initializeApp(firebaseConfig);

  // Exportar Firestore
  const db = getFirestore(app);
  
  export { db };