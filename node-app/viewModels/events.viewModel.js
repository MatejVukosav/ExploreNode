'use strict'

const EventViewModel = require('../viewModels/event.viewModel');

module.exports = function (events) {
    return users.map((_event) => (new EventViewModel(_event)));
};