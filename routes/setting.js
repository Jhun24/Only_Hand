/**
 * Created by janghunlee on 2018. 8. 18..
 */
module.exports = setting;

let async = require('async');
let { User , Couple } = require('../DB/schema');
let random_string = require('randomstring');

function setting(app) {
    app.post('/setting/partner',(req,res)=>{
        "use strict";
        let user_token = req.body.token;
        let partner_token = req.body.partner_token;

        let d_day = req.body.d_day;

        async.waterfall([
            function (cb) {
                User.find({token:partner_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Partner Token");
                    }
                    else{
                        if(model[0].partner){
                            cb(true , 200 , "당신은 세컨드 입니다");
                        }
                        else{
                            cb(null);
                        }
                    }
                });
            },
            function (cb) {
                User.find({token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        if(model[0].partner){
                            cb(true , 200 , "바람피지마라");
                        }
                        else{
                            cb(null , model[0]);
                        }
                    }
                });
            },
            function (user , cb) {
                if(user.user_data.gender == '남자'){
                    let saveCouple = new Couple({
                        couple_accept : false,
                        male_token : user_token,
                        female_token : partner_token,
                        couple_room_token : random_string.generate(),
                        couple_data:{
                            d_day : d_day,
                            photo_list:null,
                        }
                    });

                    saveCouple.save((err,model)=>{
                        if(err) throw err;
                        cb(null , 200 , "Send Success");
                    });
                }
                else if(user.user_data.gender == '여자'){
                    let saveCouple = new Couple({
                        couple_accept : false,
                        male_token : partner_token,
                        female_token : user_token,
                        couple_room_token : random_string.generate(),
                        couple_data:{
                            d_day : d_day,
                            photo_list:null,
                        }
                    });

                    saveCouple.save((err,model)=>{
                        if(err) throw err;
                        cb(null , 200 , "Send Success");
                    });
                }
            }
        ],function (cb , status , data) {
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:data
                });
            }
        })
    });

    app.post('/setting/accept/partner',(req,res)=>{
        "use strict";
        let couple_room_token = req.body.couple_room_token;
        let accept = req.body.accept;

        if(accept){
            async.waterfall([
                function (cb) {
                    Couple.find({couple_room_token:couple_room_token},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 401 , "Unauthorized Couple Room Token");
                        }
                        else{
                            cb(null , model[0]);
                        }
                    });
                },
                function (couple_room, cb) {
                    User.find({token:couple_room.male_token},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 401 , "Unauthorized Male Token");
                        }
                        else{
                            cb(null , couple_room , model[0]);
                        }
                    });
                },
                function (couple_room , male , cb) {
                    User.find({token:couple_room.female_token},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 401 , "Unauthorized Female Token");
                        }
                        else{
                            cb(null , couple_room , male , model[0]);
                        }
                    });
                },
                function (couple_room , male , female , cb) {
                    User.update({token:couple_room.male_token},{$set:{
                        couple:{
                            couple_room_token:couple_room.couple_room_token,
                            couple_id : female.id ,
                            couple_token : female.token,
                            couple_name : female.user_data.name
                        }
                    }},(err,model)=>{
                        if(err) throw err;
                        cb(null , couple_room , male , female);
                    });
                },
                function (couple_room , male , female , cb) {
                    User.update({token:couple_room.female_token},{$set:{
                        couple_room_token:couple_room.couple_room_token,
                        couple_id : male.id ,
                        couple_token : male.token,
                        couple_name : male.user_data.name
                    }},(err,model)=>{
                        if(err) throw err;
                        cb(null , couple_room);
                    });
                },
                function (couple_room , cb) {
                    Couple.update({couple_room_token:couple_room.couple_room_token},{$set:{couple_accept:true}},(err,model)=>{
                        if(err) throw err;
                        cb(null , 200 , "Accept Success");
                    });
                }
            ],function (cb , status , data) {
                if(cb == true || cb == null){
                    res.send({
                        status:status,
                        message:data
                    });
                }
            });
        }
        else{
            Couple.remove({couple_room_token:couple_room_token},(err,model)=>{
                if(err) throw err;
                res.send({
                    status:200,
                    message:"Accept Delete Success"
                });
            });
        }
    });


    app.get('/setting/get/partner/:token',(req,res)=>{
        "use strict";
        let user_token = req.params.token;
        
        async.waterfall([
            function (cb) {
                User.find({token:user_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model[0]);
                    }
                });
            },
            function (user , cb) {
                if(user.user_data.gender == "남자"){
                    Couple.find({
                        couple_accept:false,
                        male_token:user_token
                    },(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 404 , "No Data");
                        }
                        else{
                            cb(null , model);
                        }
                    });
                }
                else if(user.user_data.gender == '여자'){
                    Couple.find({
                        couple_accept:false,
                        female_token:user_token
                    },(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 404 , "No Data");
                        }
                        else{
                            cb(null , model);
                        }
                    });
                }
            },
            function (couple_room , cb) {
                if(couple_room.male_token == user_token){
                    User.find({token:couple_room.female_token},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 401 , "Unauthorized Partner Token");
                        }
                        else{
                            cb(null , 200 , couple_room , model[0])
                        }
                    });
                }
                else{
                    User.find({token:couple_room.male_token},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 401 , "Unauthorized Partner Token");
                        }
                        else{
                            cb(null , 200 , couple_room , model[0])
                        }
                    });
                }
            }
        ],function (cb , status , data , partner) {
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    couple_data:data,
                    partner_data:partner
                });
            }
        })
    });
}