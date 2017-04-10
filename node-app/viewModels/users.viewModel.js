'use strict'

const AuthViewModel = require('../viewModels/auth.viewModel');

module.exports = function (users) {
    return users.map((_user) => (new AuthViewModel(_user)));
};