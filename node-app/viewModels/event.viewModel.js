'use strict'

module.exports = function (event) {
    return {
        id: event._id, 
        title: event.title, 
        days: event.days,
        schedule: event.schedule};
};