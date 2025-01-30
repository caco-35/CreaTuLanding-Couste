import { Box, Typography, Container } from "@mui/material";

const Nosotros = () => {
  return (
    <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", }}>
     <Container>   
       <Typography variant="h4" paragraph>
       Nos especializamos en ofrecer ropa de calidad con las últimas tendencias y los mejores materiales. Somos una tienda eCommerce dedicada a brindarte una experiencia de compra fácil, segura y accesible, con una amplia variedad de prendas para todos los estilos. Creemos en la moda como una forma de expresión y nos esforzamos por ofrecer productos que combinen comodidad, estilo y calidad. ¡Descubre nuestras colecciones y viste con confianza!
       </Typography>
     </Container>
   </Box>
 );
}

export default Nosotros;