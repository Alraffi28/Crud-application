const connectdb = require('./Config/db');
const express = require('express');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes');
const app = express();
const PORT = 5000;
app.use(cors())
app.use(express.json())
connectdb()
app.use('/api' , UserRoutes)

app.listen(PORT , () => {
    console.log(`server connected on ${PORT}`);
})