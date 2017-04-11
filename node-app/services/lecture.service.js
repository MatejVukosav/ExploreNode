'use strict'

const Q = require('q');
const models = require('../models/event.model');

function createLecture(lecture) {
    let deferred = Q.defer();

    const lectureObject = new models.Lecture(lecture);

    lectureObject.save((_err,_lecture) => {
        if (_err) {
            return deferred.reject(500);
        }

        return deferred.resolve(_lecture);

    });
    return deferred.promise;
}

module.exports = {
    createLecture
}