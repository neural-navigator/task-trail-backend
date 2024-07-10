const express = require('express');
const {dbConfig, serverPort} = require('./config/config');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');




mongoose.connect(dbConfig.dbConnStr).then(
    () => console.log("db connection successful!")
).catch (
    () => (console.log("connection failed"))
);


const app = express();
// app.use(cors());


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use('/api/v1', userRoutes);


app.listen(serverPort, ()=>{
    console.log(`server is running on ${serverPort}`);
})
