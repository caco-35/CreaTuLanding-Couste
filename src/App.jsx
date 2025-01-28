import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error from './components/Error';
import Footer from './components/Footer';
import './App.css'
import Home from './components/Home';
import Nosotros from './components/Nosotros';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const db = getFirestore();

  useEffect(() => {
    const itemRef = doc(db, 'items', 'rgvfugMEqPpOs08mNYRn');

    getDoc(itemRef)
      .then((doc) => {
        if (!doc.exists()) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [db]);

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<NavBar setSelectedCategory={setSelectedCategory}/>}>
            <Route index element={<Home />} />
            <Route path='/productos' element={<ItemListContainer selectedCategory={selectedCategory} />} />
            <Route path="/productos/:id" element={<ItemDetailContainer />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>  
  );
};



export default App;