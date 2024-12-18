import { Box, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material'; // Icono para desplegar el menú
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
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
  const [isHovering, setIsHovering] = useState(false); // Estado para controlar el hover en la flecha

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Abre el menú
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Cierra el menú
  };

  const handleProductsClick = () => {
    setSelectedCategory(''); // Muestra todos los productos al hacer clic en "Productos"
    handleMenuClose(); // Cierra el menú en caso de estar abierto
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Filtrar productos según la categoría seleccionada
    handleMenuClose(); // Cerrar el menú después de seleccionar
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ padding: '1rem' }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Logo Empresa
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, opacity: { xs: 0, md: 1 }, visibility: { xs: 'hidden', md: 'visible' }, transition: 'opacity 0.5s ease-in-out, visibility 0.6s ease-in-out' }} >
              <MenuItem sx={menuItemStyle}>
                <Link to={'/'}>
                  <Button sx={{ color: 'white' }}>Inicio</Button>
                </Link>
              </MenuItem>
              <MenuItem sx={menuItemStyle}>
                <Link to={'productos'}>
                  <Button sx={{ color: 'white' }} onClick={handleProductsClick} >Productos</Button>
                </Link>
                <Button sx={{ color: isHovering ? '#17e5fc' : 'white', minWidth: 'auto', transform: isHovering ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, color 0.3s ease' }} aria-controls="categories-menu" aria-haspopup="true" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={handleMenuOpen} >
                  <ArrowDropDown />
                </Button>
                <Menu id="categories-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} MenuListProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' } }} >
                  <MenuItem onClick={() => handleCategoryClick('')}>Todas las Categorías</MenuItem>
                  <MenuItem onClick={() => handleCategoryClick('Ropa')}>Ropa</MenuItem>
                  <MenuItem onClick={() => handleCategoryClick('Pantalones')}>Pantalones</MenuItem>
                  <MenuItem onClick={() => handleCategoryClick('Chaquetas')}>Chaquetas</MenuItem>
                  <MenuItem onClick={() => handleCategoryClick('Calzado')}>Calzado</MenuItem>
                  <MenuItem onClick={() => handleCategoryClick('Accesorios')}>Accesorios</MenuItem>
                </Menu>
              </MenuItem>
              <MenuItem sx={menuItemStyle}>
                <Link>
                  <Button sx={{ color: 'white' }}>Ofertas</Button>
                </Link>
              </MenuItem>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <CartWidget />
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default NavBar;
