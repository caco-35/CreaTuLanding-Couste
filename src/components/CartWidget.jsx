// CartWidget.js
import { useState } from "react";
import { IconButton, Badge, Dialog, DialogTitle, DialogContent, Button, List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../data/context/CartContext";

const CartWidget = () => {
  const { cartItems, getTotalItems, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    clearCart();
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <>
      {/* Botón del carrito */}
      <IconButton size="large" color="inherit" onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems()} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>

      {/* Modal del carrito */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} fullWidth>
        <DialogTitle>Carrito de Compras</DialogTitle>
        <DialogContent>
          {Object.keys(cartItems).length === 0 ? (
            <Typography>El carrito está vacío.</Typography>
          ) : (
            <>
              <List>
                {Object.values(cartItems).map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={item.name} secondary={`Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`} />
                    <List sx={{ display: 'flex', gap: 1 }}> 
                      <Button onClick={() => updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)} disabled={item.quantity <= 1}>
                        -
                      </Button>
                      <Typography sx={{ margin: 'auto' }}>{item.quantity}</Typography>
                      <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</Button>
                      <Button onClick={() => removeFromCart(item.id)} color="error">Eliminar</Button>
                    </List>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: ${getTotalPrice().toFixed(2)}
              </Typography>
              <Button onClick={clearCart} color="secondary" variant="contained" sx={{ mt: 2 }}>
                Vaciar Carrito
              </Button>
              <Button 
                onClick={handleCheckout}
                color="primary" 
                variant="contained" 
                sx={{ mt: 2, ml: 2 }}
              >
                Finalizar Compra
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de compra */}
      <Dialog open={checkoutOpen} onClose={handleCloseCheckout}>
        <DialogTitle>¡Gracias por tu compra!</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Monto total: ${getTotalPrice().toFixed(2)}</Typography>
          <Typography variant="body1">Esperamos verte pronto.</Typography>
          <Box textAlign="center">
            <Button onClick={handleCloseCheckout} variant="contained" color="primary" sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartWidget;
