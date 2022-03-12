require('dotenv').config()
const express = require('express')
const app = express()
const {handleAll} = require("./config/db")
const {router:restaurentRouter} = require("./controllers/user.controllers")
const {router:userRouter} = require("./controllers/user.controllers")
app.use(express.json())





app.get("/",async(req,res)=>{
    res.status(200).json({"message":"Server started successfully"})
})
app.use("/users",userRouter)
app.use("/restaurent",restaurentRouter)

const port = process.env.PORT || 3000;


app.listen(`${port}`,async(req,res)=>{
    handleAll()
    console.log("Server started on port " + port)
})