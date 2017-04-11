'use strict'

const Q = require('q');
const models = require('../models/event.model');

function getEvents() {
    console.log('events service');

    let deferred = Q.defer();

    models
        .Event
        .find({})
        .exec((_err, _events) => {
            if (_err) {
                return deferred.reject(500);
            }
            return deferred.resolve(_events);
        });
    return deferred.promise;
}

function getEvent(eventId) {
    console.log('get event');

    let deferred = Q.defer();

    models
        .Event
        .findById(eventId)
        .exec((_err, _event) => {
            if (_err) {
                return deferred.reject(500);
            }
            if (!_event) {
                return deferred.reject(404);
            }

            return deferred.resolve(_event);
        });
    return deferred.promise;
}

function createEvent(event) {
    let deferred = Q.defer();

    const eventObject = models.Event(event);
    eventObject.save((_err, _event) => {
        if (_err) {
            return deferred.reject(500);
        }
        if (!_event) {
            return deferred.reject(404);
        }

        return deferred.resolve(_event);
    });
    return deferred.promise;

}

module.exports = {
    getEvents,
    getEvent,
    createEvent
}