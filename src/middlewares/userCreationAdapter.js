const { hashPassword } = require("../services/encryptPassword");

async function userCreationAdapter(req, res, next) {
    const { user } = req.body;

    if (!user) return res.status(400).send('Favor informe um usuário ou senha válida');

    const encryptedPassword = await hashPassword(user.password);

    const encryptedUser = {
        ...user,
        password: encryptedPassword
    };

    req.encryptedUser = encryptedUser;

    next();
}

module.exports = { userCreationAdapter }
