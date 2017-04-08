'use strict';

const mongoose = require('mongoose');
const models = require('../models/event.model');

const EventsViewModel = require('../viewModels/events.viewModel');
const EventService = require('../services/event.services');

function getEvents(req, res) {
    console.log('getEvents ');

    EventService
        .getEvents()
        .then((events) => {
            res.json(new EventsViewModel(events));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}

function getEvent(req, res) {
    console.log('getEvent');

    const eventId = req.params.eventId

    EventService
        .getEvent(eventId)
        .then((event) => {
            res.json(new EventViewModel(event));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}

function createEvent(req, res) {
    console.log('create event ');

    const event = req.body;
    const schedule = req.body.schedule;
    const days = req.body.schedule.days;

    console.log(event);
    console.log(' ');
    console.log(schedule);
    console.log(' ');
    console.log(days);
    

    EventService
        .createEvent(event)
        .then((event) => {
            res.json(new EventViewModel(event));
        })
        .catch((_err) => {
            //ako ga rejecta
            res.sendStatus(_err);
        });
}

module.exports = {
    getEvents,
    getEvent,
    createEvent
}