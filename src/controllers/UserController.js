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
        try {
            const user = await UserModel.findOne({
                where: { email: email }
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async updateUserInfo(email, updatedUser) {
        const { firstName, lastName, password } = updatedUser;

        const updatedAt = new Date().toUTCString();

        try {
            await UserModel.update(
                {
                    firstName,
                    lastName,
                    password,
                    updatedAt
                },
                { where: { email } }
            )
        } catch (error) {
            throw error;
        }
    }

    static async deleteUserById(id) {
        try {
            await UserModel.destroy({
                where: { id }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UserController }
