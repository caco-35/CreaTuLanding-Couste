import '../styles/styles.css';
import PropTypes from "prop-types";
import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase"; // Asegúrate de que este sea el archivo correcto donde inicializas Firebase

const ItemListContainer = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        // Referencia a la colección "products"
        const productsCollection = collection(db, "products");

        // Si hay una categoría seleccionada, aplica un filtro con `where`
        const productsQuery = selectedCategory
        ? query(productsCollection, where("category", "==", selectedCategory))
        : productsCollection;
          console.log(selectedCategory);
          console.log(productsQuery);
          console.log(productsCollection);

        // Obtiene los documentos desde Firebase
        const snapshot = await getDocs(productsQuery);
        const fetchedItems = snapshot.docs.map((doc) => ({
          id: doc.id, // Incluye el ID del documento
          ...doc.data(), // Datos del documento
        }));

        setItems(fetchedItems);
      } catch (error) {
        console.error("Error al obtener productos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  return (
    <div className="items-container">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
};

ItemListContainer.propTypes = {
  selectedCategory: PropTypes.string, // Cambiado a string para representar la categoría seleccionada
};

export default ItemListContainer;
