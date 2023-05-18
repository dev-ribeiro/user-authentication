const request = require('supertest');

async function verifyUserAlreadyExists(url, email) {
    const userResponse = await request(url)
        .get(`/api/find/${email}`)

    if (userResponse.status !== 200) return false;

    return true;
};

module.exports = { verifyUserAlreadyExists };
