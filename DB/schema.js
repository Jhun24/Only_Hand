/**
 * Created by janghunlee on 2018. 8. 18..
 */

let mongoose = require('mongoose');
let Logger = require('../func/logger').Logger;

mongoose.connect('mongodb://localhost:27017/onlyhand') ;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Logger.info("Mongo DB ON");
});

let User = new mongoose.Schema({
    id : String,
    password : String,
    token : String,
    user_data:{
        name : String,
        gender : String,
        profile_img_url : String,
        phone_number:String,
    },
    partner:Boolean,
    couple:{
        couple_room_token : String,
        couple_id : String ,
        couple_token : String,
        couple_name : String
    }
});

let Couple = new mongoose.Schema({
    couple_accept : Boolean,
    male_token : String,
    female_token : String,
    couple_room_token : String,
    couple_data:{
        d_day : Number,
        photo_list : [{
            photo_url : String,
        }]
    }
});

let userModel = mongoose.model('userModel',User);
let coupleModel = mongoose.model('coupleModel',Couple);

exports.User = userModel;
exports.Couple = coupleModel;