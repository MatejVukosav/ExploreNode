'use strict'

const Q = require('q');
const User = require('../models/user.model');

function createUser(user) {
    console.log('create user');

    let deferred = Q.defer();

    user.save((_err) => {
        if (_err) {
            //ide u catch blok
            return deferred.reject(500);
        }

        return deferred.resolve(user);
    })

    return deferred.promise;
}

function getUser(username, password) {
    console.log('get user');

    let deferred = Q.defer();
    User
    //.findOne({username: username, password: password})
        .findOne({username: username, password: password})
        .exec((_err, _user) => {

            if (_err) {
                console.log(_err);

                return deferred.reject(500);
            }

            if (_user) {
                return deferred.resolve(_user);
            } else {
                return deferred.reject(404);
            }
        });

    return deferred.promise;
}

module.exports = {
    createUser,
    getUser
}