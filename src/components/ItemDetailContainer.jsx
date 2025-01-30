import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../data/context/CartContext.jsx"; 
import { Box, CardMedia, Button, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase.js";  

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); 
  const [value, setValue] = useState(1);
  const [product, setProduct] = useState(null); 
  const [selectedImage, setSelectedImage] = useState(product?.imgs?.[0] || 'default-image-url.jpg');
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
  
        if (productSnap.exists()) {
          const productData = productSnap.data();
          productData.id = productSnap.id;
          setProduct(productData);
          if (Array.isArray(productData.imgs) && productData.imgs.length > 0) {
            setSelectedImage(productData.imgs[0]);
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
    return <div>Cargando...</div>; 
  }

  if (!product) {
    return <h2>El producto no existe</h2>; 
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
    if (value > product.stock) {
      alert("No hay suficiente stock");
      return;
    }else{
      addToCart(product, value);
      product.stock -= value;
    }
  };
  
  return (
    <div className="container-details">
      <Box sx={{ display:"flex", width:"80%", justifyContent:"space-between", marginTop:"5em" }}>
        <Box sx={{ display:"flex", gap:"1em" }}>
          <CardMedia sx={{ height:"500px", width:"500px", backgroundSize:"cover", backgroundPosition:"center" }} image={product.imgs || 'default-image-url.jpg'} title="Imagen producto" />
        </Box>
        <Box sx={{ marginLeft:"2em", flex: 1, backgroundColor:"#f5f5f5", padding:"1em", borderRadius:"10px" }}>
          <h2>Detalle del producto</h2>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>Precio: ${product.price}</h3>
          <p>Stock: {product.stock}</p>
          <Box sx={{ display:"flex", alignItems:"center", gap:"1em", marginTop:"1em" }}>
            <TextField id="outlined-number" value={value} onChange={handleChange} label="Cantidad" type="number" slotProps={{ inputLabel: { shrink: true } }} InputProps={{ inputProps: { min: 1, max: 99 } }} sx={{ height: '20px', '& .MuiInputBase-root': { height:'30px', fontSize:'0.8rem' } }} />
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
