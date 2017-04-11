'use strict'

const Q = require('q');
const models = require('../models/event.model');

function createDay(day) {
    let deferred = Q.defer();

    const dayObject = new models.Day(day);

    dayObject.save((_err, _day) => {
        if (_err) {
            return deferred.reject(500);
        }

        return deferred.resolve(_day);

    });
    return deferred.promise;
}

module.exports = {
    createDay
}