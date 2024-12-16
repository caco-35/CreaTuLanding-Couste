import { Box, AppBar, Toolbar, Typography, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import CartWidget from './CartWidget';

const NavBar = ({ setSelectedCategory }) => {

  const [category, setCategory] = useState(""); // Estado local para la categoría

  const handleChange = (event) => {
    const selected = event.target.value;
    setCategory(selected);
    setSelectedCategory(selected); // Actualiza la categoría seleccionada en el padre
  };

  const menuItemStyle = {
    borderRadius: '15px',
    transition: '0.4s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#17e5fc',
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: '1rem' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Logo Empresa
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Select
              value={category}
              onChange={handleChange}
              displayEmpty
              sx={{ color: "white", border: "1px solid white", borderRadius: "15px", minWidth: "150px" }}
            >
              <MenuItem value="">Todas las Categorías</MenuItem>
              <MenuItem value="Ropa">Ropa</MenuItem>
              <MenuItem value="Pantalones">Pantalones</MenuItem>
              <MenuItem value="Chaquetas">Chaquetas</MenuItem>
              <MenuItem value="Calzado">Calzado</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <CartWidget />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
