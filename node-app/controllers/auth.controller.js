'use strict';

const mongoose = require('mongoose');
const User = require('../models/user.model');

const AuthService = require('../services/auth.service');
const AuthViewModel = require('../viewModels/auth.viewModel');

function login(req, res) {
    console.log('login');

    const username = req.body.username;
    const password = req.body.password;

    AuthService
        .getUser(username, password)
        .then((user) => {
            return res.json(new AuthViewModel(user));
        })
        .catch((_err) => {
            //ako ga rejecta
            return res.sendStatus(_err);
        });
}

function register(req, res) {

    const user = new User(req.body);

    if (!user.username) {
        return res.json('Username is mandatory');
    }

    if (!user.password) {
        return res.json("Password is mandatory");
    }

    if (!user.age) {
        return res.json("Age is mandatory");
    }

    if (!user.gender) {
        return res.json("Gender is mandatory");
    }

    console.log('register');

    AuthService
        .createUser(user)
        .then((user) => {
            res
                .json(new AuthViewModel(user));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}

module.exports = {
    login,
    register
}