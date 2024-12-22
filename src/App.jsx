import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error from './components/Error';
import Footer from './components/Footer';
import './App.css'
import Home from './components/Home';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<NavBar setSelectedCategory={setSelectedCategory}/>}>
            <Route index element={<Home />} />
            <Route path='/productos' element={<ItemListContainer selectedCategory={selectedCategory} />} />
            <Route path="/productos/:id" element={<ItemDetailContainer />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>  
  );
};



export default App;