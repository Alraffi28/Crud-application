const user = require('../Model/User');
const createUser = async (req , res) => {
    try{
        const {name , subject , grade} = req.body
        const newUser = new user({name , subject , grade})
        await newUser.save()
        res.status(200).json({message : "User Created" , data : newUser})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "Error in Creating"})
    }
}

const getUser = async (req , res) => {
    try{
        const getUsers = await user.find()
        res.status(200).json({message : "data get successfully" , data : getUsers})
    }
    catch(error){
        res.status(500).json({message : "error getting user"})
    }
}

const updateUser = async (req , res) => {
    try{
        const updatedUser = await user.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
        )
    res.status(200).json({message : "edited successfully" , data : updatedUser})
    }
    catch(error){
        res.status(500).json({message : "error in updating"})
    }
}

const deleteUser = async (req , res) => {
    try{
       const deletedUser = await user.findByIdAndDelete(req.params.id,
        req.body,
        {new:true}
       )
        res.status(200).json({message : "Deleted successfully" , data : deletedUser})
    }
    catch(error){
        res.status(500).json({message : "error in delete"})
    }
}
module.exports = {createUser , getUser ,updateUser , deleteUser}