// models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

// models/Image.js
const Image = sequelize.define('Image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Relación con el modelo Product
Image.belongsTo(Product, { 
    foreignKey: 'id_product', 
    onDelete: 'CASCADE' 
});


module.exports = Image;
