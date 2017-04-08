'use strict';

const mongoose = require('mongoose');
const Event = require('../models/event.model');

const ScheduleViewModel = require('../viewModels/schedule.viewModel');
const ScheduleService = require('../services/schedule.service');

function getSchedule(req, res) {
    console.log('getSchedule');

    const eventId = req.params.eventId

    ScheduleService
        .getSchedule(eventId)
        .then((schedule) => {
            res.json(new ScheduleViewModel(schedule));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}



module.exports = {
    getSchedule
}