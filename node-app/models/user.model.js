/**
 * Created by Vuki on 25.3.2017..
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String,
    first_name : String,
    last_name : String,
    gender : String,
    age : Number,
    profile_image : { data: Buffer, contentType: String }

});

module.exports = mongoose.model('User',userSchema);
