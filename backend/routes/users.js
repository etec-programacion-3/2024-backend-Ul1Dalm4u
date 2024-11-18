const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update(req.body); // Se usa el método de la instancia
            res.json(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy(); // Se llama el método en la instancia
            res.send('Usuario eliminado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

// Iniciar sesión (login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por su email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña con la almacenada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, 'secreto', { expiresIn: '1h' });

        // Enviar el token al cliente
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;
