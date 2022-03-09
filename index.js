require('dotenv').config()
const express = require('express')
const app = express()
const {Client} = require("pg")
const bcrypt = require('bcryptjs');
const Joi = require("joi")
const date = new Date()
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,} = require('http-status-codes');
const client = new Client({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})
const createTable = `CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
)`;

const res = `CREATE TABLE restaurents(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    locations VARCHAR(50) UNIQUE NOT NULL,
    price_range int NOT NULL check(price_range>=1 and price_range<=5)
);`;
// INSERT into restaurents(name,locations,price_range) values('pizzastop','miami',3)
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

// get all restaurents

app.get("/api/v1",async(req,res)=>{
    try{
    const response  = await client.query("SELECT * FROM restaurents")
    console.log(response)
    res.status(200).send(response.rows)
    }catch(err){
        console.log(err)
        res.send("Something broke")
    }
})
app.get("/api/v1/:id",async(req,res)=>{
    try{
        const response = await client.query(`SELECT * FROM restaurents WHERE id = ${req.params.id}`)
        res.status(StatusCodes.OK).json({"restaurent":response.rows})
    }catch(err){
        console.log(err)
        res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({error:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)})
    }
})
app.post("/users",async(req,res)=>{
    try{
    const value = await schema.validateAsync({email:req.body.email,username:req.body.username,password:req.body.password});
    const insert_query = "INSERT INTO users(username,email,password,created_at) VALUES($1,$2,$3,$4) RETURNING *"
    let hashed_password = bcrypt.hashSync(value.password, 8)
    const response = await client.query(insert_query,[value.username,value.email,hashed_password,date])
    if(response){
        res.status(StatusCodes.CREATED).send({message:getReasonPhrase(StatusCodes.CREATED)})
    }
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