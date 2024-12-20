import '../styles/styles.css';
import ItemList from './ItemList';
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { CircularProgress, Box } from '@mui/material';

const ItemListContainer = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    const fetchProductos = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1500);
    });

    fetchProductos.then((data) => {
      if (selectedCategory) {
        setItems(data.filter((product) => product.categoria === selectedCategory));
      } else {
        setItems(data);
      }
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <div className='items-container'>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
