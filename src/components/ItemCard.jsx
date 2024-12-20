import React, { useState } from "react";
import { Card, CardContent, IconButton, CardMedia, Typography, TextField, CardActions, Divider, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PropTypes from "prop-types";
import fondo from '../assets/react.svg';
import { Link } from "react-router-dom";

const ItemCard = ({ id, nombre, precio, descripcion, stock }) => {
  const [value, setValue] = useState(1);

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value, 10);

    if (isNaN(newValue)) {
      newValue = '';
    } else if (newValue > 99) {
      newValue = 99;
    } else if (newValue > stock) {
      newValue = stock;
    } else if (newValue < 1) {
      newValue = 1;
    }

    setValue(newValue);
  };


  return (
    <>
      <Link to={`/productos/${id}`}>
        <Card className="card">
          <CardMedia
            sx={{ height: 150, width: 180, backgroundSize: "cover", backgroundPosition: "center", margin: "auto" }} image={fondo} title="fondo card" />
          <Divider sx={{ margin: "5px" }} />
          <CardContent sx={{ width: "auto", height: "120px" }}>
            <Typography variant="h5" component="div">{nombre}</Typography>
            <Typography className="text-description" variant="body2" sx={{ color: "text.secondary" }}>{descripcion}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" component="div">Precio: <strong>${precio}</strong></Typography>
            <Typography sx={{ fontSize: "14px" }} variant="h6" component="div">Stock: {stock}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <TextField id="outlined-number" value={value} onChange={handleChange} label="Cantidad" type="number" slotProps={{ inputLabel: { shrink: true } }} InputProps={{ inputProps: { min: 1, max: 99 } }} sx={{ height: "20px", "& .MuiInputBase-root": { height: "30px", fontSize: "0.8rem" }, marginBottom: "10px", }} />
            <IconButton size="small" color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    </>
  );
};

ItemCard.propTypes = {
  nombre: PropTypes.string,
  id: PropTypes.number,
  precio: PropTypes.number,
  descripcion: PropTypes.string,
  stock: PropTypes.number,
};

export default ItemCard;
