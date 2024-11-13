const express = require('express');
const router = express.Router();
const Image = require('../models/image'); // Asegúrate de importar el modelo Image

// Obtener todas las imágenes asociadas a un producto
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const images = await Image.findAll({
      where: { id_product: productId }
    });
    if (images.length > 0) {
      res.json(images);
    } else {
      res.status(404).json({ message: 'No images found for this product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Crear una nueva imagen asociada a un producto
router.post('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  const { url } = req.body;

  try {
    const newImage = await Image.create({
      id_product: productId,
      url
    });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Error creating image' });
  }
});

// Actualizar la URL de una imagen
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  try {
    const image = await Image.findByPk(id);
    if (image) {
      await image.update({ url });
      res.json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating image' });
  }
});

// Eliminar una imagen
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (image) {
      await image.destroy();
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image' });
  }
});

module.exports = router;
