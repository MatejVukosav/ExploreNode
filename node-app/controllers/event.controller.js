'use strict';

const mongoose = require('mongoose');
const models = require('../models/event.model');
const Promise = require("bluebird");
const Q = require('q');

const EventsViewModel = require('../viewModels/events.viewModel');
const EventViewModel = require('../viewModels/event.viewModel');
const EventService = require('../services/event.service');
const LectureService = require('../services/lecture.service');
const LecturerService = require('../services/lecturer.service');
const DayService = require('../services/day.service');

function getEvents(req, res) {
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
    const eventId = req.params.eventId

    EventService
        .getEvent(eventId)
        .then((event) => {
            res.json(new EventViewModel(event));
        })
        .catch((_err) => {
            console.log(_err);
            res.sendStatus(500);
        });
}

function createEvent(req, res) {
    //console.log('create event usao');
    let event = new models.Event(req.body);

    Promise.map(event.schedule, (day) => {
        //console.log(day) imam svaki dan zasebno
        Promise.map(day.lectures, (lecture) => {
            //imam svako predavanje zasebno console.log(lecture);

            return LecturerService
                .createLecturer(lecture.lecturer)
                .then((lecturerModelObject) => {
                    //imam lecturera console.log(lecture.lecturer)
                    lecture.lecturer = lecturerModelObject;
                })
                .then(() => {
                    return LectureService
                        .createLecture(lecture)
                        .then((lessonModelObject) => {
                            //vratim lecture
                            return lessonModelObject;
                        });
                })
        }).then((mappedLecturesToArrayOfMongoObjects) => {
            day.lectures = mappedLecturesToArrayOfMongoObjects;
        }).then(() => {
            return DayService
                .createDay(day)
                .then((dayMongoObject) => {
                    return dayMongoObject;
                });
        });

    }).then((mongoDaysObjects) => {
        event.days = mongoDaysObjects;
        return EventService
            .createEvent(event)
            .then((eventMongoObject) => {
                return eventMongoObject;
            })
            .catch((_err) => {
                console.log(_err);
                res.sendStatus(500);
            });

    }).then((mongoEventObject) => {
        event = mongoEventObject;
        res.json(new EventViewModel(event));
    }).catch((_err) => {
        console.error(_err);
        res
            .status(500)
            .end('Not ok');
    })

}

module.exports = {
    getEvents,
    getEvent,
    createEvent
}