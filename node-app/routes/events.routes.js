/*/**
 * Created by Vuki on 25.3.2017..
 */
'use strict';

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');
const ScheduleController = require('../controllers/schedule.controller');

router.get('/:eventId', EventController.getEvent);
router.post('/', EventController.createEvent);
router.get('/', EventController.getEvents);

router.get('/:eventId/schedule',  ScheduleController.getSchedule);

module.exports = router;
