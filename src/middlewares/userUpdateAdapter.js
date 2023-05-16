const { hashPassword } = require('../services/encryptPassword');
const { UserController } = require('../controllers/UserController');

async function userUpdateAdapter(req, res, next) {
    console.log(req.body);
    const { email } = req.params;
    const { firstName, lastName, password } = req.body;

    const user = await UserController.findByEmail(email);

    if (!user) {
        return res.status(400).end();
    }

    if (!password) {
        req.updatedUser = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            password: user.password
        }

        next();
        return;
    }

    const encryptedUpdatedPassword = await hashPassword(password);

    req.updatedUser = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        password: encryptedUpdatedPassword
    }

    next();
}

module.exports = { userUpdateAdapter }
