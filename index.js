require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const profileroute = require('./routes/profileroute');

const body_parser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
connectDb();

const PORT = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.use('/',userRoute);
app.use('/',postRoute);
app.use('/',profileroute);


app.listen(PORT,()=>{
    console.log('server listen at',PORT);
})
