const sql = require('mssql')
const conexion = require('../database/db')

const getUsuarios = async (req, res) => {
    const conn = await conexion;
    const { recordset } = await conn.query('Select * from Cliente');
    if (recordset.length>0) {
        res.send(recordset)
    }else{
        res.send('No hay clientes registrados')
    }
}

const getClienteById = async (req,res) =>{
    const {idCliente} = req.body;
    const pool = await conexion;
    let {recordset} = await pool.request()
        .input('idCliente', sql.Int, idCliente)
        .query('SELECT * FROM Cliente WHERE idCliente=@idCliente')
    if (recordset.length>0) {
        res.send(recordset)
    }else{
        res.send('No se encontro un cliente')
    }
}

const altaCliente = async (req,res) => {
    const {Paterno,Materno,Celular,Edad,Correo,Contraseña} = req.body;
    const pool = await conexion;
    let result1 = await pool.request()
        .input('Paterno', sql.VarChar(50), Paterno)
        .input('Materno', sql.VarChar(50), Materno)
        .input('Celular', sql.Int, Celular)
        .input('Edad', sql.Int, Edad)
        .input('Correo', sql.VarChar(50), Correo)
        .input('Contraseña', sql.VarChar(50), Contraseña)
        .query('INSERT INTO Cliente(Paterno,Materno,Celular,Edad,Correo,Contraseña) VALUES (@Paterno,@Materno,@Celular,@Edad,@Correo,@Contraseña)')
    if (result1.rowsAffected>0) {
        res.send('Cliente registrado')
    }else{
        res.status(400).send('Error al insertar el Cliente')
    }
}

const modificaCliente = async (req,res) =>{
    const {Paterno,Materno,Celular,Edad,Correo,Contraseña,idCliente} = req.body;
    const pool = await conexion;
    let result1 = await pool.request()
        .input('Paterno', sql.VarChar(50), Paterno)
        .input('Materno', sql.VarChar(50), Materno)
        .input('Celular', sql.Int, Celular)
        .input('Edad', sql.Int, Edad)
        .input('Correo', sql.VarChar(50), Correo)
        .input('Contraseña', sql.VarChar(50), Contraseña)
        .input('idCliente', sql.Int, idCliente)
        .query('UPDATE Cliente SET Paterno=@Paterno,Materno=@Materno,Celular=@Celular,Edad=@Edad,Correo=@Correo,Contraseña=@Contraseña WHERE idCliente=@idCliente')
    if (result1.rowsAffected>0) {
        res.send('Cliente actualizado')
    }else{
        res.status(400).send('Error al actualizar el Cliente')
    }
}

module.exports = {
    getUsuarios,
    getClienteById,
    altaCliente,
    modificaCliente
}