import '../styles/styles.css'
import ItemList from "./ItemList";
import { useEffect, useState } from 'react';
import { products } from '../data/products';



const ItemListContainer = () => {
  
  
const [items, setItems] = useState([]);

    useEffect(() => {
      const fetchProductos = new Promise((resolve) => {
          setTimeout(() => {
              resolve(products)
      },2000)
      })
      fetchProductos.then((data) => {
          setItems(data)
      })
  },[])

  return (
      <div>
          <ItemList items={ items }/>
      </div>
  )
}

export default ItemListContainer