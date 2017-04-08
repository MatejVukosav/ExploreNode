'use strict';

const mongoose = require('mongoose');
const User = require('../models/user.model');

const UsersViewModel = require('../viewModels/users.viewModel');
const UserService = require('../services/user.service');

function getAll(req, res) {
    console.log('getAll controller');

    UserService
        .getAll()
        .then((users) => {
            res.json(new UsersViewModel(users));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}

module.exports = {
    getAll
}