'use strict'

module.exports = function (event) {
    return {
       title :event.title,
       days: event.days,
       schedule:event.schedule
    };
};