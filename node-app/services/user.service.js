'use strict'

const Q = require('q');
const User = require('../models/user.model');

function getAll() {
    console.log('get all users');

    let deferred = Q.defer();
    User
        .find({})
        .exec((_err, _users) => {
            if (_err) {
                console.log(_err);
                return deferred.reject(500);
            }

            if (_users) {
                return deferred.resolve(_users);
            } else {
                return deferred.reject(404);
            }
        });
    return deferred.promise;
}

module.exports = {
    getAll
}