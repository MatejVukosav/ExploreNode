'use strict';

const express = require('express');
const router = express.Router();
const Schedule = require('../models/event.model');
const Event = require('../models/event.model');

//dohvati schedule po identifikatoru
router.get('/:schedule', (req, res, next) => {
    const scheduleId = req.params.schedule;

    Schedule.findById(scheduleId)
        .exec((_err, _schedule) => {
            if (_err) {
                return res.sendStatus(500);
            }
            if (!_schedule) {
                return res.sendStatus(404);
            }
            res.json({'data': _schedule});
        });
});

/**
 * Spremi novi raspored
 */
router.post('/eventId', (req, res, next) => {

    Event.findById(scheduleId)
        .exec((_err, _event) => {
            if (_err) {
                return res.sendStatus(500);
            }
            if (!_event) {
                return res.sendStatus(404);
            }
            //event je skroz oke
            console.log('oldie: ' + _event.schedule);

            const schedule = new Schedule(req.body);
            console.log('goldie: ' + schedule);
            _event.schedule = _event;

            event.save((_err) => {
                if (_err) {
                    return res.sendStatus(500);
                }
                res.json({'data': _event});
            });
        });

});

module.exports = router;
