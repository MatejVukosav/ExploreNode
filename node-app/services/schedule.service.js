'use strict'

const Q = require('q');
const Event = require('../models/event.model');
const ScheduleService = require('../services/schedule.service');

function getSchedule(eventId) {
    let deferred = Q.defer();
    
    console.log('get schedule');

    ScheduleService
        .getSchedule(eventId)
        .then((schedule) => {
            return deferred.resolve(schedule);
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });

    return deferred.promise;
}

module.exports = {
    getSchedule
}