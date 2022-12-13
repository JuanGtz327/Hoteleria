const express = require('express');
const router = express.Router();
const {getUsuarios,altaCliente,getClienteById, modificaCliente} = require('../controller/usuarioController')

router.get('/obtenClientes',getUsuarios);

router.post('/obtenCliente',getClienteById)

router.post('/altaCliente',altaCliente);

router.post('/modificaCliente',modificaCliente);

module.exports = router