import { Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";
import { useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemCard = ({ id, nombre, precio, descripcion, stock, imagenes }) => {

  const db = getFirestore();
  
    useEffect(() => {
      const itemCollection = doc(db, 'items');
  
      getDoc(itemCollection).then(snapshot => snapshot.docs.map(docu =>  { 
        console.log(docu.data());
      }));
    }, [db]);
 
  return (
    <>
      <Link to={`/productos/${id}`} className="link-card">
        <Card className="card">
          <CardMedia sx={{ height: 150, width: 180, backgroundSize: "cover", backgroundPosition: "center", margin: "auto" }} image={imagenes[0]} title="fondo card" />
          <Divider sx={{ margin: "5px" }} />
          <CardContent sx={{ width: "auto", height: "120px" }}>
            <Typography variant="h5" component="div">{nombre}</Typography>
            <Typography className="text-description" variant="body2" sx={{ color: "text.secondary" }}>{descripcion}</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" component="div">Precio: <strong>${precio}</strong></Typography>
            <Typography sx={{ fontSize: "14px" }} variant="h6" component="div">Stock: {stock}</Typography>
          </CardContent>
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
  imagenes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ItemCard;
