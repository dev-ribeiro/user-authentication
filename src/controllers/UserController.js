const UserModel = require('../models/user');

class UserController {

    static async createUser(createUser) {
        try {
            await UserModel.create(createUser)
        } catch (error) {
            throw error;
        }
    }

    static async listAll() {
        try {
            return await UserModel.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const user = await UserModel.findOne({
            where: { email: email }
        });

        if(!user) {
            throw new Error();
        };

        return user;
    }
}

module.exports = { UserController }
