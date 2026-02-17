const mongoose = require('mongoose');
require('dotenv').config()

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db ATLAS connected');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectdb