const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); 
const cors= require('cors');
const imageRoutes = require('./routes/images');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la tienda de ropa tino_uli');
});

// Rutas para productos
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/images', imageRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
