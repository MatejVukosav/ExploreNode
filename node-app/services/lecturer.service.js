'use strict'

const Q = require('q');
const models = require('../models/event.model');

function createLecturer(lecturer) {
    let deferred = Q.defer();

    const lecturerObject = new models.Lecturer(lecturer);

    lecturerObject.save((_err,_lecturer) => {
        if (_err) {
            return deferred.reject(500);
        }

        return deferred.resolve(_lecturer);

    });
    return deferred.promise;
}

module.exports = {
    createLecturer
}