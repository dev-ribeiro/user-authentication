const { UserController } = require("../controllers/UserController");

async function processUserUpdate(req, res, next) {
    const { email } = req.params;
    const { firstName, lastName } = req.body;

    const user = await UserController.findByEmail(email);
    console.log("MIDDLEWARE ", user)

    if (!user) {
        return res.status(400).end();
    }

    req.updatedUser = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName
    }

    next();
}

module.exports = { processUserUpdate }
