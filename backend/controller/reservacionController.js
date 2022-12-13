const sql = require('mssql')
const conexion = require('../database/db')

const getReservaciones = async (req, res) => {
    const conn = await conexion;
    const { recordset } = await conn.query('Select * from Reserva');
    if (recordset.length > 0) {
        res.send(recordset)
    } else {
        res.send('No hay reservaciones registrados')
    }
}

const bajaReservacion = async (req, res) => {
    const { idReserva } = req.body;
    const pool = await conexion;
    let { rowsAffected } = await pool.request()
        .input('idReserva', sql.Int, idReserva)
        .query('DELETE FROM Reserva WHERE idReserva=@idReserva')
    if (rowsAffected[0] == 1) {
        res.send('Reservacion dada de baja')
    } else {
        res.send('No hay reservaciones registrados')
    }
}

module.exports = {
    getReservaciones,
    bajaReservacion
}