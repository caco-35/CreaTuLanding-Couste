import { Box, CardMedia } from '@mui/material';
import fondo from '../assets/react.svg';
import { products } from '../data/products';
import { useParams } from 'react-router-dom';


const ItemDetailContainer = () => {

  const {id} = useParams();
  const product = products.find(item => item.id === parseInt(id))

  if(!product){
    return <h2>El producto no existe</h2>
  }
  return (
    
    <div className='container-details'>
      <Box sx={{ display: 'flex', width: '60%', justifyContent: 'space-between', marginTop: '5em' }}>
        <Box>
          <h2>Aca quiero colocar las imagenes</h2>
          <CardMedia sx={{ height: '500px', width: '500px', backgroundSize: "cover", backgroundPosition: "center", margin: "auto" }} image={fondo} title="fondo card" />
        </Box>
        <Box>
          <h2>Detalle del producto</h2>
          <h2>{product.nombre}</h2>
          <p>{product.descripcion}</p>
          <h3>{product.precio}</h3>
        </Box>
      </Box>
    </div>
    
  )
}

export default ItemDetailContainer