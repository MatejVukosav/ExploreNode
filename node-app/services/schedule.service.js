'use strict'

const Q = require('q');
const models = require('../models/event.model');

function getSchedule(eventId) {
    let deferred = Q.defer();

    models
        .Event
        .findById(eventId)
        .exec((_err, _event) => {
            if (_err) {
                return deferred.reject(500);
            }
          
            if (!_event || !_event.schedule) {
                return deferred.reject(404);
            }

            return deferred.resolve(_event.schedule);
        });

    return deferred.promise;
}

module.exports = {
    getSchedule
}