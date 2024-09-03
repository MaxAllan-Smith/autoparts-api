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

// GET /users/:username - Find user by username
router.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;

        // Query the database by username, not by _id
        const user = await User.findOne({ username: username });

        if (!user) {
            // If no user is found, return a 404 error
            return res.status(404).json({ error: 'User not found' });
        }

        // If user is found, return the user object
        res.status(200).json(user);
    } catch (error) {
        // Log the error and return a 500 error with a specific message
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server Error: An error occurred while fetching the user' });
    }
});


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
