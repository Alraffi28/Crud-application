require("dotenv").config()
const connectdb = require('./Config/db');
const express = require('express');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use('/api' , UserRoutes)
connectdb().then(()=>{
    app.listen(PORT , ()=>{console.log(`server running ${PORT}`)})
}).catch((err) =>{
    console.log("Failed to connect" , err);
})