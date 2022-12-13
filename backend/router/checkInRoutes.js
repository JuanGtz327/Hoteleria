const express = require('express');
const router = express.Router();
const {CheckIn,PreCheckIn,getCheckIn,completaCheckIn} = require('../controller/checkInController')

router.post('/pre',PreCheckIn);

router.get('/obtenReserva',getCheckIn)

router.post('/new',CheckIn);

router.post('/completaCheckIn',completaCheckIn);

module.exports = router