const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended:false}));

app.use('/',require('./router/mainRouter'))
app.use('/cliente',require('./router/usuarioRoutes'))
app.use('/checkIn',require('./router/checkInRoutes'))

app.listen(process.env.PORT || 8080, ()=>{
    console.log('Server ON');
})