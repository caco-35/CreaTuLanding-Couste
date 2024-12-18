import '../styles/styles.css';
import ItemList from './ItemList';
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { CircularProgress, Box } from '@mui/material';

const ItemListContainer = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    const fetchProductos = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1500); // Simulación de un retraso de 1.5 segundos
    });

    fetchProductos.then((data) => {
      if (selectedCategory) {
        setItems(data.filter((product) => product.categoria === selectedCategory));
      } else {
        setItems(data);
      }
      setLoading(false); // Detener el efecto de carga
    });
  }, [selectedCategory]);

  return (
    <div>
      {loading ? (
        // Spinner centrado en pantalla
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Ocupa toda la altura de la pantalla
          }}
        >
          <CircularProgress size={60} /> {/* Tamaño del spinner */}
        </Box>
      ) : (
        // Mostrar los productos una vez cargados
        <ItemList items={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
