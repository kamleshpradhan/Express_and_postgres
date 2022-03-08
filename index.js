const express = require('express')
const app = express()
const {Client} = require("pg")
const Joi = require("joi")
const date = new Date()
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,} = require('http-status-codes');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'fastApi',
    password: '123456789',
    port: 5432,
})
try{
client.connect()
}catch(err){
    console.log(err)
}
app.use(express.json())

const schema = Joi.object({
    username:Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
app.get("/",async(req,res)=>{
    res.status(200).json({"message":"Server started successfully"})
})


app.get("/users",async(req,res)=>{
    try{
    const users = await client.query("SELECT *  FROM users")
    res.status(200).json(users.rows)
    }catch(err){
        console.log(err)
    }
})

app.post("/users",async(req,res)=>{
    try{
    const value = await schema.validateAsync({email:req.body.email,username:req.body.username,password:req.body.password});
    const insert_query = "INSERT INTO users(email,password,created_at) VALUES($1,$2,$3) RETURNING *"
    const response = await client.query(insert_query,[value.email,value.password,date])
    return response
    }catch(err){
        res.status(StatusCodes.NOT_ACCEPTABLE).send({error:getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),info:err})
    }
})

// client.query("SELECT * FROM users WHERE id = 1",(req,res,err)=>{
//     console.log(res)
//     client.end()
// })


const port = process.env.PORT || 3000;


app.listen(`${port}`,async(req,res)=>{
    console.log("Server started on port " + port)
})