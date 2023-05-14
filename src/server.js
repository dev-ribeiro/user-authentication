const express = require('express');
const { router } = require('./routes/routes')

const server = express();

server.use(express.json());
server.use(router);

const PORT = process.env.PORT || 3335;
server.listen(PORT, () => console.log('Server running on port ', PORT));
