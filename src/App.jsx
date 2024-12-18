import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import './App.css'
import Home from './components/Home';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<NavBar setSelectedCategory={setSelectedCategory}/>}>
            <Route index element={<Home />} />
            <Route path='/productos' element={<ItemListContainer selectedCategory={selectedCategory} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};



export default App;