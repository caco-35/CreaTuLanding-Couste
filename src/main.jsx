import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './data/context/CartContext';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB61C3X1NVrmmUkzAXuSxqPchtwzmaUg7U",
  authDomain: "tienda-coder-503fc.firebaseapp.com",
  projectId: "tienda-coder-503fc",
  storageBucket: "tienda-coder-503fc.firebasestorage.app",
  messagingSenderId: "869236197702",
  appId: "1:869236197702:web:a3bfbb279b74dd067e3d47",
  measurementId: "G-LH1XP0YDL0"
};

// Initialize Firebase
initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <> 
    <CartProvider>
      <App />
    </CartProvider>
  </>,
)
