const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');
const { userUpdateAdapter } = require('../middlewares/userUpdateAdapter');
const { findUserByEmail } = require('../middlewares/findUserByEmail');
const { userCreationAdapter } = require('../middlewares/userCreationAdapter');
const { userLoginAdapter } = require('../middlewares/userLoginAdapter');

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

router.post('/login/:email', userLoginAdapter, async (req, res) => {
    const user = req.user;

    return res.status(200).json(user);
});

router.post('/create', userCreationAdapter, async (req, res) => {
    const encryptedUser = req.encryptedUser;

    try {
        await UserController.createUser(encryptedUser);
        return res.status(201).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.put('/update/:email', userUpdateAdapter, async (req, res) => {
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
