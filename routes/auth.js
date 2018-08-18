/**
 * Created by janghunlee on 2018. 8. 18..
 */
module.exports = auth;

let random_string = require('randomstring');
let { User } = require('../DB/schema');
let async = require('async');
let upload = require('../func/multer').upload;

let Logger = require('../func/logger').Logger;

function auth(app) {
    app.post('/auth/login',(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;

        async.waterfall([
            function (cb) {
                User.find({id:id , password : password},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , 200 , model[0].token);
                    }
                });
            } 
        ],function (cb , status , data) {
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:data
                });
            }
        });
    });

    app.post('/auth/register',upload.single('profile'),(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;
        let name = req.body.name;
        let gender = req.body.gender;
        let phone_number = req.body.phone_number;

        let profile_img_url = req.file.path.replace('uploads/');
        let token = random_string.generate();

        Logger.info(req.file.path);

        console.log(profile_img_url);
        console.log(id);
        async.waterfall([
            function (cb) {
                User.find({id:id},(err, model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(null);
                    }
                    else{
                        cb(true , 401 , "Already Exist");
                    }
                });
            },
            function (cb) {
                let saveUser = new User({
                    id:id,
                    password:password,
                    token:token,
                    user_data:{
                        name:name,
                        gender:gender,
                        profile_img_url:profile_img_url,
                        phone_number:phone_number
                    },
                    date_vote:false
                });

                saveUser.save((err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , token);
                });
            }
        ],function (cb , status , data) {
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:data
                });
            }
        })
    });
}