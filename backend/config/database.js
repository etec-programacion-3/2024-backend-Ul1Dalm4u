const { Sequelize } = require('sequelize');

// Configura la conexión a MySQL
const sequelize = new Sequelize('tino_uli', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// Verifica si la conexión es exitosa
sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a MySQL'))
  .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = sequelize;