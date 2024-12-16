import { useState } from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import './App.css'


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <NavBar setSelectedCategory={setSelectedCategory} />
      <ItemListContainer selectedCategory={selectedCategory} />
    </div>
  );
};

export default App;