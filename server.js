const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const questionApiRouter = require('./modules/question/questionApiRouter');
const questionViewRouter = require('./modules/question/questionViewRouter');
const mongoose = require('mongoose');
const config = require('./config');
let app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.engine('handlebars', handlebars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.use('/', questionViewRouter);
app.use('/api/question', questionApiRouter);


app.use(express.static(__dirname + '/public'));

mongoose.connect(config.connectionString, (err) =>{
    if(err){
        console.log(err);
    } else {
        console.log('connected')
    }
} );

app.listen(config.port , ()=>{
    console.log('Sever ip up!');
});