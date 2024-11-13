// models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

// Definir el modelo de imágenes
const Image = sequelize.define('Image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Establecer la relación con Product (clave foránea)
Image.belongsTo(Product, { 
    foreignKey: 'idproduct', 
    onDelete: 'CASCADE' 
});

module.exports = Image;
