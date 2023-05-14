const { UserController } = require("../controllers/UserController");

async function findUserByEmail(req, res, next) {

    const { email } = req.params;

    const user = await UserController.findByEmail(email);

    if (!user) return res.status(400).end();

    req.userId = user.id;

    next();
};

module.exports = { findUserByEmail }
