const sql = require('mssql')
const conexion = require('../database/db')

const altaHabitacion = async (req,res)=>{
    const {Tipo,Ocupada} = req.body;
    const pool = await conexion;
    let result1 = await pool.request()
        .input('Tipo', sql.VarChar(50), Tipo)
        .input('Ocupada', sql.Int, Ocupada)
        .query('INSERT INTO Habitacion(Tipo,Ocupada) VALUES (@Tipo,@Ocupada)')
    if (result1.rowsAffected>0) {
        res.send('Habitacion registrada')
    }else{
        res.status(400).send('Error al insertar la habitacion')
    }
}

const getHabitaciones = async (req, res) => {
    const conn = await conexion;
    const { recordset } = await conn.query('SELECT * FROM Habitacion');
    if (recordset.length>0) {
        res.send(recordset)
    }else{
        res.send('No hay habitaciones registradas')
    }
}

module.exports = {
    altaHabitacion,
    getHabitaciones
}