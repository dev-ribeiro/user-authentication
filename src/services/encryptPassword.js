require('dotenv').config();
const bcrypt = require('bcrypt');

const SECRET = process.env.SECRET;

async function hashPassword(password) {

    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password + SECRET, salt);
}

async function comparePassword(password, hashedPassword) {
    const result = await bcrypt.compare(password + SECRET, hashedPassword);

    return result;
}

module.exports = { hashPassword, comparePassword }
