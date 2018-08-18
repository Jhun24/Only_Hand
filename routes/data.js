/**
 * Created by janghunlee on 2018. 8. 18..
 */

module.exports = data;

let { User , Couple } = require('../DB/schema');

function data(app) {

    app.get('/user/:token',(req,res)=>{
        "use strict";
        let token = req.params.token;

        User.find({token:token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Unauthorized Token"
                });
            }else{
                res.send({
                    status:200,
                    data:model[0]
                })
            }
        });
    });

    app.get('/data/user/:name',(req,res)=>{
        "use strict";
        let name = decodeURI(req.params.name);
        console.log(name);
        User.find({
            'user_data.name':name
        },(err,model)=>{
            if(err) throw err;
            console.log(model);
            if(model.length == 0){
                res.send({
                    status:404,
                    message:"User Not Found"
                });
            }
            else{

                res.send({
                    status:200,
                    data:model
                });
            }
        });
    });

    app.get('/data/user/:phone_number',(req,res)=>{
        "use strict";
        let phone_number = req.params.phone_number;

        User.find({
            'user_data.phone_number':phone_number
        },(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404,
                    message:"User Not Found"
                });
            }
            else{
                res.send({
                    status:200,
                    data:model
                });
            }
        });
    });

    app.get('/data/couple/:token',(req,res)=>{
        "use strict";
        let token = req.params.token;

        Couple.find({male_token:token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                Couple.find({female_token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        res.send({
                            status:401,
                            message:"Unauthorized Token"
                        });
                    }
                    else{
                        res.send({
                            status:200,
                            token:model[0].couple.couple_room_token
                        });
                    }
                });
            }
            else{
                res.send({
                    status:200,
                    token:model[0].couple.couple_room_token
                });
            }
        });
    })
}