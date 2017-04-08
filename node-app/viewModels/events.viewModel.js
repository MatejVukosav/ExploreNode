'use strict'

const EventViewModel = require('../viewModels/event.viewModel');

module.exports = function (events) {

    let data = [];
    events.forEach(function (event) {
        data.push(new EventViewModel(event));
    });

    return {data};
};