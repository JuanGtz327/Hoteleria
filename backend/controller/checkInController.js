const sql = require('mssql')
const datetime = require('node-datetime');
const conexion = require('../database/db')

const PreCheckIn = async (req,res)=>{
    const {idCliente,cant_huesp} = req.body;
    const fchReserva = datetime.create().format('Y/m/d H:M:S')
    const pool = await conexion;
    let result1 = await pool.request()
        .input('idCliente', sql.Int, idCliente)
        .input('cant_huesp', sql.Int, cant_huesp)
        .input('fchReserva', sql.DateTime, fchReserva)
        .query('INSERT INTO Reserva(idCliente,cant_huesp,fchReserva) VALUES (@idCliente,@cant_huesp,@fchReserva)')
    if (result1.rowsAffected>0) {
        res.send('Pre registro completo')
    }else{
        res.status(400).send('Error en el pre registro')
    }
}

const CheckIn = async (req,res)=>{
    const {idCliente,cant_huesp,fchSalida,noHabitacion} = req.body;
    const fchReserva = datetime.create().format('Y/m/d H:M:S')
    const pool = await conexion;
    let result1 = await pool.request()
        .input('idCliente', sql.Int, idCliente)
        .input('cant_huesp', sql.Int, cant_huesp)
        .input('fchReserva', sql.DateTime, fchReserva)
        .input('fchLlegada', sql.DateTime, fchReserva)
        .input('fchSalida', sql.DateTime, fchSalida)
        .input('noHabitacion', sql.Int, noHabitacion)
        .query('INSERT INTO Reserva(idCliente,cant_huesp,fchReserva,fchLlegada,fchSalida,noHabitacion) VALUES (@idCliente,@cant_huesp,@fchReserva,@fchReserva,@fchSalida,@noHabitacion)')
    if (result1.rowsAffected>0) {
        res.send('Check In Completo')
    }else{
        res.status(400).send('Error en el check In')
    }
}

const getCheckIn = async (req,res) =>{
    const {idCliente} = req.body;
    const pool = await conexion;
    let {recordset} = await pool.request()
        .input('idCliente', sql.Int, idCliente)
        .query('SELECT * FROM Reserva WHERE idCliente=@idCliente')
    if (recordset.length>0) {
        res.send(recordset)
    }else{
        res.send('No se encontro una reservacion')
    }
}

const completaCheckIn = async (req,res) =>{
    const {fchSalida,noHabitacion,idCliente} = req.body;
    const fchLlegada = datetime.create().format('Y/m/d H:M:S')
    const pool = await conexion;
    let result1 = await pool.request()
        .input('fchLlegada', sql.DateTime, fchLlegada)
        .input('fchSalida', sql.DateTime, fchSalida)
        .input('noHabitacion', sql.Int, noHabitacion)
        .input('idCliente', sql.Int, idCliente)
        .query('UPDATE Reserva SET fchLlegada=@fchLlegada,fchSalida=@fchSalida,noHabitacion=@noHabitacion WHERE idCliente=@idCliente')
    if (result1.rowsAffected>0) {
        res.send('Check In Completo')
    }else{
        res.status(400).send('Error en el check In')
    }
}

module.exports = {
    CheckIn,
    PreCheckIn,
    getCheckIn,
    completaCheckIn
}