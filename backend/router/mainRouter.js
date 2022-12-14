const express = require('express');
const router = express.Router();
const {altaHabitacion,getHabitaciones} = require('../controller/habitacionController')
const {getReservaciones,bajaReservacion} = require('../controller/reservacionController')

router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/altaHab',altaHabitacion);

router.get('/obtenHab',getHabitaciones);

router.get('/reservaciones',getReservaciones);

router.post('/bajaReserv',bajaReservacion);

module.exports = router