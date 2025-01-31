import { Box, Typography, Container } from "@mui/material";

const Home = () => {
  return (
     <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          ¡Bienvenidos a Caconline!
        </Typography>
        <Typography variant="h5" paragraph>
          Descubre los mejores productos en nuestra tienda online.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
