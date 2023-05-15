const express = require('express');
const router = express.Router();
const api = require('./api.routes');
const view = require('./view.routes');

router.use('/', view);
router.use('/api', api);

module.exports = { router }
