const UserModel = require('../models/user');

class UserController {

    static async createUser(createUser) {
        try {
            await UserModel.create(createUser)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UserController }
