const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Update a user by ID
router.put('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: `Server Error: ${error.message}` });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: `Server Error: ${error.message}` });
    }
});

// Get a user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: `Server Error: ${error.message}` });
    }
});

router.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({ username: username });

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    } catch (error) {
        res.status(500).send({ error: `Server Error: ${error.message}` });
    }
})

// Delete a user by ID
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: `Server Error: ${error.message}` });
    }
});

module.exports = router;
