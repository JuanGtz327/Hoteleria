const sql = require('mssql')
const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    server: 'localhost',
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        trsutedConnection: true
    }
}

const conexion = async () => {
    try {
        return await sql.connect(sqlConfig)
    } catch (err) {
        console.log(err);
    }
}

module.exports = conexion();