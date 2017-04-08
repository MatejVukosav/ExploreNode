'use strict'

const AuthViewModel = require('../viewModels/auth.viewModel');

module.exports = function (users) {

    let data = []; 
    users.forEach(function (user) {
          data.push(new AuthViewModel(user));
    });

    return {data};
};