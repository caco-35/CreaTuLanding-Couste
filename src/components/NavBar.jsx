import { Box, AppBar, Toolbar, Typography, MenuItem } from '@mui/material';
import CartWidget from './CartWidget';

const menuItemStyle = {
    borderRadius: '15px', 
    transition: '0.4s', 
    '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#17e5fc',
  },
};

const NavBar = () => {

    return(
    <Box sx={{ flexGrow: 1}} >
        <Box sx={{ flexGrow: 1, fontSize:"8px", textAlign:"center"}} >
            <h1>Información en general</h1>
        </Box>
      <AppBar className='app-bar' position="static" sx={{ padding: '1rem' }}>
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
                    <Typography variant="h6" color="inherit" component="div">Productos</Typography>
                </MenuItem>
                <MenuItem sx={menuItemStyle}>
                    <Typography variant="h6" color="inherit" component="div">Ofertas</Typography>
                </MenuItem>
            </Box>
          <Box sx={{ flexGrow: 1 }} />
          <CartWidget />
        </Toolbar>
      </AppBar>
    </Box>

    )
}

export default NavBar;