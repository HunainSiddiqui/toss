const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();
const connectDB = require("./config/db")
connectDB();
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(cors({
    origin: ['http://localhost:3001'],
    methods: 'GET, POST,PUT,DELETE',
    credentials: true, // Include cookies in requests
  }));
const user = require("./route/userroute")
const dotenv = require('dotenv');
dotenv.config();

const alerts = require("./route/alertsroute")
app.use("/api",user) ;
app.use("/api",alerts) ;





app.listen(process.env.PORT,()=>{
  console.log(`Server Started at ${process.env.PORT}`)
})







  