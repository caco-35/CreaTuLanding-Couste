import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../data/context/CartContext.jsx"; 
import { Box, CardMedia, Button, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase.js";  // Asegúrate de que la configuración de Firebase esté correcta

const ItemDetailContainer = () => {
  const { id } = useParams();  // Obtiene el id del producto desde la URL
  const { addToCart } = useCart(); 
  const [value, setValue] = useState(1);
  const [product, setProduct] = useState(null);  // Estado para el producto
  const [selectedImage, setSelectedImage] = useState(product?.imgs?.[0] || 'default-image-url.jpg');
  const [loading, setLoading] = useState(true);  // Estado de carga

  // Función para obtener el producto desde Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Referencia al documento del producto en Firestore
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          // Si el producto existe, lo guardamos en el estado
          const productData = productSnap.data();
          setProduct(productData);
          if (Array.isArray(productData.imgs) && productData.imgs.length > 0) {
            setSelectedImage(productData.imgs[0]);  // Establece la primera imagen por defecto
            console.log(setSelectedImage);
            //console.log(selectedImage);
          }
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;  // Aquí podrías agregar un spinner o algún tipo de carga visual
  }

  if (!product) {
    return <h2>El producto no existe</h2>;  // Si el producto no se encuentra
  }

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value, 10);

    if (event.target.value === "") {
      newValue = 1;
    } else if (isNaN(newValue)) {
      newValue = "";
    } else if (newValue > 99) {
      newValue = 99;
    } else if (newValue > product.stock) {
      newValue = product.stock;
    } else if (newValue < 1) {
      newValue = 1;
    }
    setValue(newValue);
  };

  const handleAddToCart = () => {
    addToCart(product, value);
  };



  return (
    <div className="container-details">
      <Box sx={{ display:"flex", width:"80%", justifyContent:"space-between", marginTop:"5em" }}>
        <Box sx={{ display:"flex", gap:"1em" }}>
    
          <CardMedia 
            sx={{ height:"500px", width:"500px", backgroundSize:"cover", backgroundPosition:"center" }} 
            image={product.imgs || 'default-image-url.jpg'} // Si no hay imagen seleccionada, usa la predeterminada
            title="Imagen seleccionada"
          />
        </Box>

        <Box sx={{ marginLeft:"2em", flex: 1, backgroundColor:"#f5f5f5", padding:"1em", borderRadius:"10px" }}>
          <h2>Detalle del producto</h2>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>Precio: ${product.price}</h3>
          <p>Stock: {product.stock}</p>
          <Box sx={{ display:"flex", alignItems:"center", gap:"1em", marginTop:"1em" }}>
            <TextField 
              id="outlined-number" 
              value={value} 
              onChange={handleChange} 
              label="Cantidad" 
              type="number" 
              slotProps={{ inputLabel: { shrink: true } }} 
              InputProps={{ inputProps: { min: 1, max: 99 } }} 
              sx={{ height: '20px', '& .MuiInputBase-root': { height:'30px', fontSize:'0.8rem' } }}
            />
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ItemDetailContainer;
