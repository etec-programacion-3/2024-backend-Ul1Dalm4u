const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { name, description, price, stock, gender } = req.body;
  const newProduct = await Product.create({ name, description, price, stock, gender});
  res.json(newProduct);
});


// Actualizar un producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, gender} = req.body;
  const product = await Product.findByPk(id);

  if (product) {
    await product.update({ name, description, price, stock, gender});
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;s
  const product = await Product.findByPk(id);

  if (product) {
    await product.destroy();
    res.send('Producto eliminado');
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

module.exports = router;
