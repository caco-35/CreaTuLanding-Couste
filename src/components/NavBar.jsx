import { Box, AppBar, Toolbar, Typography, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import CartWidget from './CartWidget';
import { Outlet, Link } from 'react-router-dom';



  const menuItemStyle = {
    borderRadius: '15px',
    transition: '0.4s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#17e5fc',
    },
  };

const NavBar = ({ setSelectedCategory }) => {

  const [category, setCategory] = useState(""); // Estado local para la categoría

  const handleChange = (event) => {
    const selected = event.target.value;
    setCategory(selected);
    setSelectedCategory(selected); // Actualiza la categoría seleccionada en el padre
  };

  return (
    <>
      <Box sx={{ flexGrow: 1}} >
        <AppBar position="static" sx={{ padding: '1rem' }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Logo Empresa
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', gap: 2,  opacity: { xs: 0, md: 1 }, visibility: { xs: 'hidden', md: 'visible' }, transition: 'opacity 0.5s ease-in-out, visibility 0.6s ease-in-out', }}>
                  <MenuItem sx={menuItemStyle}>
                      <Typography variant="h6" color="inherit" component="div">Inicio</Typography>
                  </MenuItem>
                  <MenuItem sx={menuItemStyle}>
                      <Link variant="h6" color="inherit" component="div" to={"productos"}>Productos</Link>
                  </MenuItem>
                  <MenuItem sx={menuItemStyle}>
                      <Link variant="h6" color="inherit" component="div">Ofertas</Link>
                  </MenuItem>
              </Box>
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
      <Outlet />
    </>
  )
}

export default NavBar