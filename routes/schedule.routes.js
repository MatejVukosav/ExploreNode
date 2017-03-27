'use strict';

const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule.model');

//dohvati schedule po identifikatoru
router.get('/:scheduleId', (req, res, next) => {
    const scheduleId = req.params.scheduleId;

    Schedule.findById(scheduleId)
        .exec((_err, _schedule) => {
            if (_err) {
                return res.sendStatus(500);
            }
            if (!_schedule) {
                return res.sendStatus(404);
            }
            res.json(_schedule);
        });
});

/**
 * Spremi novi raspored
 */
router.post('/', (req, res, next) => {

    console.log(req.body);
    console.log("bla bla");

    let schedule = new Schedule(req.body);
    console.log(schedule);
    schedule.save((_err) => {
        if (_err) {
            return res.sendStatus(500);
        }
        res.json(schedule);
    });
});


module.exports = router;
