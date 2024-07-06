require('dotenv').config();

module.exports = {
    dbConnStr: process.env.db_conn_str
}

console.log(process.env.db_conn_str)
