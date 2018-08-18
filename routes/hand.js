/**
 * Created by janghunlee on 2018. 8. 19..
 */
module.exports = hand;

let { Hand } = require('../DB/schema');

function hand(app) {
    app.get('/hand',(req,res)=>{
        "use strict";
        let couple_room_token = req.query.couple_room_token;

        Hand.find({couple_room_token:couple_room_token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404,
                    message:'Couple Not Found'
                });
            }
            else{
                res.send({
                    status:200,
                    hand:model[0].hand
                });
            }
        });
    });

    app.post('/hand/update',(req,res)=>{
        "use strict";
        let couple_room_token = req.body.couple_room_token;
        let hand = req.body.hand;

        if(hand == true){
            Hand.update({couple_room_token:couple_room_token},{$set:{hand:true}},(err,model)=>{
               if(err) throw err;
               res.send({
                   status:200,
                   hand:true
               });
            });
        }
        else if(hand == true){
            Hand.update({couple_room_token:couple_room_token},{$set:{hand:false}},(err,model)=>{
                if(err) throw err;
                res.send({
                    status:200,
                    hand:false
                });
            });
        }
    });
}