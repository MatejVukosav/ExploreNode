/*/**
 * Created by Vuki on 25.3.2017..
 */
'use strict';

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');

router.get('/:eventId', EventController.getEvent);
router.post('/', EventController.createEvent);
router.get('/', EventController.getEvents);

/*
//spremi event
router.post('/efeeefs', (req, res, next) => {

    const event = new models.Event(req.body);

    let schedule = new models.Schedule(req.body.schedule);

    //console.log(schedule);

    let days = new models.Day(req.body.schedule.day);

    console.log(days);

    let daysIds = [];
    for (const dayIndex in days.$__) {
        let lectureIds = [];
        console.log(dayIndex);

        let lecturesFromDay = req.body.schedule.day[dayIndex].lectures;

        console.log(lecturesFromDay);
        let day = new models.Day(lecturesFromDay);
        //za svaki dan spremi predavanja
        for (const index in lecturesFromDay) {

            let lecture = new models.Lecture(lecturesFromDay[index]);

            console.log(lecture);

            //spremit i za predavanje predavaca
            let lecturer = new models.Lecturer(lecture.lecturer);

            // predavanje dodaj u listu predavanja
            lectureIds.push(lecture._id);

            lecturer.save((_err) => {
                if (_err) {
                    return res.sendStatus(500);
                }
                //uzmi predavacu id i dodaj ga u listu od predavanja
                lecture.lecturer = lecturer._id;

                lecture.save((_err) => {
                    if (_err) {
                        return res.sendStatus(500);
                    }

                });

            });
        }

        day.lectures = lectureIds;
        daysIds.push(day);
    }
    //spremio sam predavanja, sad moram spremit raspored
    schedule.lectures = daysIds;

    schedule.save((_err) => {
        if (_err) {
            return res.sendStatus(500);
        }
    });

    //i na kraju spremim event
    event.schedule = schedule;
    event.save((_err) => {
        if (_err) {
            return res.sendStatus(500);
        }

        res.json(event);
    });

});
*/
module.exports = router;
