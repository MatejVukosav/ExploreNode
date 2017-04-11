'use strict'

const EventViewModel = require('../viewModels/event.viewModel');

module.exports = function (events) {
    return events.map((_event) => ({id: _event._id, title: _event.title, days: _event.days}))
};
