const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        minlength : [3 , "name must be atleast 3 letters"],
        require : true
    },
    subject : {
        type : String ,
        minlength : [3 , "must be 3 letters"],
        require : true
    },
    grade : {
        type : String,
        require:true
    }
},{timestamps : true})
module.exports = mongoose.model('Student' , userSchema)
