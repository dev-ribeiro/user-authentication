const { UserController } = require('../controllers/UserController');

async function verifyUserAlreadyExists(email) {
    try {
        const user = await UserController.findByEmail(email);

        if (!user) {
            throw new Error()
        }

        return {
            result: true,
            user
        }
    } catch (error) {
        console.log(error);

        return {
            result: false,
            user: null
        }
    }
};

module.exports = { verifyUserAlreadyExists };
