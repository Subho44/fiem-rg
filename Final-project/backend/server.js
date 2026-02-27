require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require("path");

const connectdb = require('./config/db');
const jobroutes = require('./routes/jobroutes');
const authroutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json());
connectdb();
//static file access in server
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use('/api/jobs',jobroutes);
app.use('/api/auth',authroutes);
app.get('/',(req,res)=>{
    res.send("api is working");
});
const PORT = process.env.PORT||5600;

app.listen(PORT,()=>console.log("server is running port 5600"));