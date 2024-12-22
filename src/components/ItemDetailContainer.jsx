import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../data/context/CartContext.jsx"; 
import { Box, CardMedia, Button, TextField } from "@mui/material";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); 
  const [value, setValue] = useState(1);
  const product = products.find((item) => item.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product?.imagenes[0]);

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
    } else if (newValue < 1) { newValue=1; } setValue(newValue); }; const handleAddToCart=()=> {
    addToCart(product, value);
  };

  return (
    <div className="container-details">
		<Box sx={{ display:"flex" , width:"80%" , justifyContent:"space-between" , marginTop:"5em" , }}>
			<Box sx={{ display:"flex" , gap:"1em" }}>
			<Box sx={{ display:"flex" , flexDirection:"column" , gap:"10px" }}> {product.imagenes.map((img, index)=> (
              <CardMedia key={index} sx={{ height:"80px" , width:"80px" , cursor:"pointer" , border: selectedImage===img ?"2px solid blue" :"none" , objectFit:"cover" , }} component="img" image={img} alt={`Imagen ${index + 1}`} onClick={()=> setSelectedImage(img)}
              />
            ))}
          </Box>
				<CardMedia sx={{ height:"500px" , width:"500px" , backgroundSize:"cover" , backgroundPosition:"center" , }} image={selectedImage} title="Imagen seleccionada"/>
			</Box>
			<Box sx={{ marginLeft:"2em" , flex: 1 }}>
			<h2>Detalle del producto</h2>
			<h2>{product.nombre}</h2>
			<p>{product.descripcion}</p>
			<h3>Precio: ${product.precio}</h3>
			<p>Stock: {product.stock}</p>
			<Box sx={{ display:"flex" , alignItems:"center" , gap:"1em" , marginTop:"1em" , }}>
				<TextField id="outlined-number" value={value} onChange={handleChange} label="Cantidad" type="number" slotProps={{inputLabel: {shrink: true,},}} InputProps={{ inputProps: { min: 1 , max: 99 } }} sx={{height: '20px','& .MuiInputBase-root' : {height:'30px' , fontSize:'0.8rem' ,},}}/>
				<Button variant="contained" color="primary" onClick={handleAddToCart}> Agregar al carrito
			</Button>
		</Box>
	</Box>
</Box>
</div>
  );
};

export default ItemDetailContainer;
