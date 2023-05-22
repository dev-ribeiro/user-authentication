const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/UserController');
const { userUpdateAdapter } = require('../middlewares/userUpdateAdapter');
const { userCreationAdapter } = require('../middlewares/userCreationAdapter');
const { userLoginAdapter } = require('../middlewares/userLoginAdapter');

router.get('/find/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // TODO
        const selectedUser = null;

        if (!selectedUser) {
            throw new Error();
        }

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
        // TODO

        if(!encryptedUser) throw new Error();

        return res.status(201).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
});

router.put('/update/:id', userUpdateAdapter, async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.updatedUser;

    try {
        // TODO

        return res.status(202).end();
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {

        // TODO

        return res.status(202).end();
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

module.exports = router