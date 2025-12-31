const mongoose = require('mongoose');
require('dotenv').config()

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.STRING)
        console.log('db connected');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectdb