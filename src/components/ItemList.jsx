import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Typography } from "@mui/material";
import { db } from "../data/firebase"; // Importa db desde firebase.js
import ItemCard from "./ItemCard";

const ItemList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products"); // Conexión a la colección "products"
        const snapshot = await getDocs(productsCollection);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(items);
        setProducts(items);
      } catch (error) {
            console.error("Error al obtener los productos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="h6">Cargando productos...</Typography>;
  }

  return (
    <div className="container">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          id={product.id}
          nombre={product.name}
          precio={product.price}
          descripcion={product.description}
          stock={product.stock}
          imagenes={[product.imgs]}
        />
      ))}
    </div>
  );
};

export default ItemList;
