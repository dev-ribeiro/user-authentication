const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');
const { processUserUpdate } = require('../middlewares/processUserUpdate');
const { findUserByEmail } = require('../middlewares/findUserByEmail');

router.get('/all', async (req, res) => {
    try {
        const users = await UserController.listAll();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.get('/find/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const selectedUser = await UserController.findByEmail(email);
        return res.status(200).json(selectedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.post('/create', async (req, res) => {
    const { user } = req.body;

    try {
        await UserController.createUser(user);
        return res.status(201).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.put('/update/:email', processUserUpdate, async (req, res) => {
    const { email } = req.params;
    const updatedUser = req.updatedUser;

    try {
        await UserController.updateUserInfo(email, updatedUser);
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
})

router.delete('/delete/:email', findUserByEmail, async (req, res) => {
    const id = req.userId;

    try {
        await UserController.deleteUserById(id);
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
})

module.exports = router
