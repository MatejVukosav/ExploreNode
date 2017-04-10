'use strict';

const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/schedule.controller');

router.get('/:eventId', ScheduleController.getSchedule);

module.exports = router;
