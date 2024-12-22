import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Badge } from '@mui/material';
import { useCart } from "../data/context/CartContext.jsx"; // Importar el contexto

const CartWidget = () => {
  const { getTotalItems } = useCart();

  return (
    <IconButton size="large" color="inherit" >
      <Badge badgeContent={getTotalItems()} color="error">
        <ShoppingCartIcon fontSize="large" />
      </Badge>
    </IconButton>
  );
};

export default CartWidget;
