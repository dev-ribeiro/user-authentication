const { hashPassword } = require('../services/encryptPassword');
const { UserController } = require('../controllers/UserController');

async function userUpdateAdapter(req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, password } = req.body;

  const user = await UserController.findById(id);

  if (!user) {
      return res.status(404).end();
  }

  if (!password) {
      req.updatedUser = {
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
          password: user.password
      }

      next();
      return;
  }

  const encryptedUpdatedPassword = await hashPassword(password);

  req.updatedUser = {
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      password: encryptedUpdatedPassword
  }

  next();
}

module.exports = { userUpdateAdapter }
