const express = require('express');
const hbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();

app.set('views',path.join(__dirname,'../frontend/views'));
app.engine('hbs',hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
}));
app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));

app.use('/',require('./router/mainRouter'))
app.use('/cliente',require('./router/usuarioRoutes'))
app.use('/checkIn',require('./router/checkInRoutes'))

app.use('/public',express.static(path.join(__dirname,'../frontend/public')));

app.listen(process.env.PORT || 8080, ()=>{
    console.log('Server ON');
})