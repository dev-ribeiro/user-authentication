const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');

router.post('/create', async (req, res) => {
    const { user } = req.body;

    try {
        await UserController.createUser(user);
        return res.status(201).end();
    } catch (error) {
        console.log(error);
        return res.status(401).end();
    }
});

module.exports = { router }
