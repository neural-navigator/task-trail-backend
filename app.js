const express = require('express');
const {dbConfig, serverPort} = require('./config/config');
const mongoose = require('mongoose');
const userRoutes = require('./middleware/userRoutes')
const cors = require('cors');


mongoose.connect(dbConfig.dbConnStr).then(
    () => console.log("db connection successful!")
).catch (
    () => (console.log("connection failed"))
);


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', userRoutes);

app.listen(serverPort, ()=>{
    console.log(`server is running on ${serverPort}`);
})
