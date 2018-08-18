/**
 * Created by janghunlee on 2018. 8. 18..
 */

module.exports = data;

let { User } = require('../DB/schema');

function data(app) {
    app.get('/data/user/:name',(req,res)=>{
        "use strict";
        let name = req.params.name;

        User.find({
            user_data:{
                name:name
            }
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
}