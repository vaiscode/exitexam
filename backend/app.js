const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./DB/connection');
const todoRoute= require('./Routes/todoRoute');


const PORT = process.env.PORT;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use('/api',todoRoute);



app.listen(PORT,()=>{
    console.log(`${PORT} is up and running`);
})