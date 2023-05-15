const { hashPassword } = require("../services/encryptPassword");

async function userCreationAdapter(req, res, next) {
    const { user } = req.body;
    const { password } = req.headers;

    if (!user || !password) return res.status(400).send('Favor informe um usuário ou senha válida');

    const encryptedPassword = await hashPassword(password)

    const encryptedUser = {
        ...user,
        password: encryptedPassword
    };

    req.encryptedUser = encryptedUser;

    next();
}

module.exports = { userCreationAdapter }
