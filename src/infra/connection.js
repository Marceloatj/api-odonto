const mysql = require('mysql2/promise');
const logger = require('../logger');

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});
logger.error('Conexão criada!');


module.exports = connection;