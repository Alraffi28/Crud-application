const express = require('express');
const {createUser , getUser ,updateUser, deleteUser} = require('../Controller/UserController')

const router = express.Router()

router.post('/student' , createUser)
router.get('/get' , getUser)
router.put('/edit/:id' , updateUser)
router.delete('/del/:id' , deleteUser)
module.exports = router