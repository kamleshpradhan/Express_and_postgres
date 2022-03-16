require('dotenv').config()
const express = require('express')
const app = express()
const {handleAll} = require("./config/db")
const {router:restaurentRouter} = require("./controllers/restaurent.controller")
const {router:userRouter} = require("./controllers/user.controllers")
var cors = require('cors')
app.use(express.json())




app.get("/",async(req,res)=>{
    res.status(200).json({"message":"Server started successfully"})
})
app.use("/users",cors(),userRouter)
app.use("/restaurents",cors(),restaurentRouter)

const port = process.env.PORT || 3000;


app.listen(`${port}`,async(req,res)=>{
    handleAll()
    console.log("Server started on port " + port)
})