require('dotenv').config();

const dbConfig = {
    dbConnStr: process.env.db_conn_str
}

module.exports = dbConfig;
