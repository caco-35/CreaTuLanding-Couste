import { Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemCard = ({ id, nombre, precio, descripcion, stock, imagenes }) => {
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
  id: PropTypes.string.isRequired, // El ID de Firestore es una cadena
  nombre: PropTypes.string,
  precio: PropTypes.number,
  descripcion: PropTypes.string,
  stock: PropTypes.number,
  imagenes: PropTypes.arrayOf(PropTypes.string),
};

/*
ItemCard.defaultProps = {
  nombre: "",
  precio: null,
  descripcion: "",
  stock: null,
  imagenes: [],
};
*/
export default ItemCard;
