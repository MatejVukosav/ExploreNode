/**
 * Created by Vuki on 8.4.2017..
 */
'use strict';

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');

router.get('/', UsersController.getAll);

module.exports = router;