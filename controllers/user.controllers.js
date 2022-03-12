const express = require("express")
const router = express.Router()
const {client} = require("../config/db")
const {userSchema:schema} = require("../models/user.model")
const bcrypt = require('bcryptjs');
const date = new Date()
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,} = require('http-status-codes');
router.get("",async(req,res)=>{
    try{
    const users = await client.query("SELECT *  FROM users")
    res.status(200).json(users.rows)
    }catch(err){
        console.log(err)
    }
})
router.post("",async(req,res)=>{
    let user;
    user = await client.query(`SELECT * FROM users WHERE email = ${req.body.email}`)
    console.log(user)
    try{
    const value = await schema.validateAsync({email:req.body.email,username:req.body.username,password:req.body.password});
    const insert_query = "INSERT INTO users(username,email,password,created_on) VALUES($1,$2,$3,$4) RETURNING *"
    let hashed_password = bcrypt.hashSync(value.password, 8)
    const response = await client.query(insert_query,[value.username,value.email,hashed_password,date])
    if(response){
        res.status(StatusCodes.CREATED).send({message:getReasonPhrase(StatusCodes.CREATED)})
    }
    }catch(err){
        console.log(err)
        res.status(StatusCodes.NOT_ACCEPTABLE).send({error:getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),info:err})
    }
})


module.exports = {router}