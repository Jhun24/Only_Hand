/**
 * Created by janghunlee on 2018. 8. 18..
 */
module.exports = auth;

let random_string = require('randomstring');
let { User } = require('../DB/schema');
let async = require('async');
let upload = require('../func/multer').upload;

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
        let gender = req.body.age;

        let profile_img_url = req.file.path;
        let token = random_string.generate();

        async.waterfall([
            function (cb) {
                User.find({id:id},(err, model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Already Exist");
                    }
                    else{
                        cb(null);
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
                        profile_img_url:profile_img_url
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