require('dotenv').config({path: '.env.local'});

const dbConfig = {
    dbConnStr: process.env.dbConnStr
}

const serverPort = process.env.serverPort

console.log(dbConfig, serverPort)

module.exports = {dbConfig, serverPort};
