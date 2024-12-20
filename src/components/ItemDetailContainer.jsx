import { products } from '../data/products';
import { useParams } from 'react-router-dom';


const ItemDetailContainer = () => {

  const {id} = useParams();
  const product = products.find(item => item.id === parseInt(id))

  if(!product){
    return <h2>El producto no existe</h2>
  }
  return (
    
    <>
      <div>
        <h2>Detalle del producto</h2>
        <h2>{product.nombre}</h2>
        <p>{product.descripcion}</p>
        <h3>{product.precio}</h3>
      </div>
    </>
    
  )
}

export default ItemDetailContainer