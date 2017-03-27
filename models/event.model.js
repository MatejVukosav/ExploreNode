/**
 * Created by Vuki on 25.3.2017..
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    days: Number,
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }
});

const scheduleSchema = new Schema({
    schedules: [{
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }]
});

const daySchema = new Schema({
    day: String,
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }]
});

const lectureSchema = new Schema({
    time: String,
    title: String,
    location: String,
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'Lecturer'
    },
    short_description: String
});

const lecturerSchema = new Schema({
    name: String,
    biography: String,
});


let Event = mongoose.model('Event', eventSchema);
let Schedule = mongoose.model('Schedule', scheduleSchema);
let Day = mongoose.model('Day', daySchema);
let Lecture = mongoose.model('Lecture', lectureSchema);
let Lecturer = mongoose.model('Lecturer', lecturerSchema);


module.exports = {
    Event: Event,
    Day: Day,
    Schedule: Schedule,
    Lecture: Lecture,
    Lecturer: Lecturer
};
