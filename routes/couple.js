/**
 * Created by janghunlee on 2018. 8. 18..
 */

module.exports = couple;

let { User , Couple } = require('../DB/schema');

function couple(app) {
    app.get('/couple/album/:couple_room_token',(req,res)=>{
        "use strict";
        let couple_room_token = req.params.couple_room_token;

        Couple.find({couple_room_token:couple_room_token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:'Unauthorized Couple Room Token'
                });
            }
            else{
                res.send({
                    status:200,
                    data:model[0].couple_data.photo_list
                });
            }
        });
    });

    app.get('/couple/d_day/:couple_room_token',(req,res)=>{
        "use strict";
        let couple_room_token = req.params.couple_room_token;

        Couple.find({couple_room_token:couple_room_token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:'Unauthorized Couple Room Token'
                });
            }
            else{
                res.send({
                    status:200,
                    data:model[0].couple_data.d_day
                });
            }
        });
    });

    app.get('/couple/data/:couple_room_token',(req,res)=>{
        "use strict";
        let couple_room_token = req.params.couple_room_token;

        async.waterfall([
            function (cb) {
                Couple.find({couple_room_token:couple_room_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Couple Room Token');
                    }
                    else{
                        cb(null , model[0]);
                    }
                });
            },
            function (couple , cb) {
                User.find({token:couple.male_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Male Token");
                    }
                    else{
                        cb(null , couple , model[0]);
                    }
                });
            },
            function (couple , male , cb) {
                User.find({token:couple.female_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Female Token");
                    }
                    else{
                        cb(null , 200 , couple , male , model[0]);
                    }
                });
            }
        ],function (cb , status , data , male , female) {
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
                    male_data:male,
                    female_data:female
                });
            }
        })
    });

}