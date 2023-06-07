const { hashPassword } = require("../services/encryptPassword");

function isValidUser(user) {

  return Object.values(user).every(value => !value && value !== '');
};

async function userCreationAdapter(req, res, next) {
  const { user } = req.body;

  if (!user) return res.status(400).end();

  const validatedUser = isValidUser(user);

  if(!validatedUser) return res.status(400).end();

  const encryptedUser = {
    ...user,
    password: await hashPassword(user.password)
  };

  req.encryptedUser = encryptedUser;

  next();
}

module.exports = { userCreationAdapter }
