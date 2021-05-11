require('dotenv').config();
const mongoose = require('mongoose');


const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connection establish successfully');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connectDb;