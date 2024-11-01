const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo de productos
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Product;
