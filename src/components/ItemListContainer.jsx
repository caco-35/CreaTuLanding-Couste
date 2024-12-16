import '../styles/styles.css';
import ItemList from "./ItemList";
import { useEffect, useState } from 'react';
import { products } from '../data/products';

const ItemListContainer = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProductos = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, );
    });

    fetchProductos.then((data) => {
      // Filtrar productos según la categoría seleccionada
      if (selectedCategory) {
        setItems(data.filter((product) => product.categoria === selectedCategory));
      } else {
        setItems(data); // Mostrar todos los productos si no hay categoría seleccionada
      }
    });
  }, [selectedCategory]); // Dependencia para actualizar los productos al cambiar la categoría

  return (
    <div>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
