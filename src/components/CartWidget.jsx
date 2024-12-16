import { IconButton, Badge } from '@mui/material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const CartWidget = () => {
  return (
    <IconButton size="large" color="inherit" >
        <Badge badgeContent={1} color="error">
            <ShoppingCartTwoToneIcon fontSize='large'/>
        </Badge>
    </IconButton>
  )
}

export default CartWidget