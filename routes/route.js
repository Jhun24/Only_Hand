/**
 * Created by janghunlee on 2018. 8. 18..
 */
module.exports = route;

function route(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render('index.html');
    });
}