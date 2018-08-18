/**
 * Created by janghunlee on 2018. 8. 18..
 */
module.exports = route;

function route(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render('index.html');
    });

    app.get('/login',(req,res)=>{
        "use strict";
        res.render('login.html');
    });
}