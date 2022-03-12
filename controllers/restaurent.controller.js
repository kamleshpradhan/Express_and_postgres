const express = require("express")
const {client} = require("../config/db")
const router = express.Router()
const {restuarentSchema:schema} = require("../models/restaurent.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,} = require('http-status-codes');
router.get("",async(req,res)=>{
    try{
    const response  = await client.query("SELECT * FROM restaurents")
    console.log(response)
    res.status(200).send(response.rows)
    }catch(err){
        console.log(err)
        res.send("Something broke")
    }
})
router.get("/:id",async(req,res)=>{
    try{
        const response = await client.query(`SELECT * FROM restaurents WHERE id = ${req.params.id}`)
        res.status(StatusCodes.OK).json({"restaurent":response.rows})
    }catch(err){
        console.log(err)
        res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({error:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)})
    }
})

router.post("",async(req,res)=>{
    const resp  = await client.query(`SELECT * FROM restaurents`)
    let arr = resp.rows
    for(let j of arr){
        if(j.name==req.body.name){
            res.status(StatusCodes.METHOD_NOT_ALLOWED).json({message:getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED),reason:"Restaurent is already present."})
            return
        }
    }
    try{
        const value = await schema.validateAsync({name:req.body.name,locations:req.body.locations,price_range:req.body.price_range});
        const insert_query = "INSERT INTO restaurents(name,locations,price_range) VALUES($1,$2,$3) RETURNING *"
        const response = await client.query(insert_query,[value.name,value.locations,value.price_range])
        if(response){
         res.status(StatusCodes.CREATED).send({message:getReasonPhrase(StatusCodes.CREATED)})
     }
     }catch(err){
         res.status(StatusCodes.NOT_ACCEPTABLE).json({error:err["details"]})
     }
})


router.put("/:id",async(req,res)=>{
    let resp = await client.query(`SELECT * FROM restaurents WHERE id = ${req.params.id}`)
    if(resp.rowCount==0){
        res.status(StatusCodes.NOT_FOUND).json({"message":`Restaurent with id: ${req.params.id} not found.`})
        return;
    }
    console.log(req.body)
})


router.delete("/:id",async(req,res)=>{
    let resp = await  client.query(`SELECT * FROM restaurents WHERE id = ${req.params.id}`)
    if(resp.rowCount==0){
        res.status(StatusCodes.NOT_FOUND).json({"message":`Restaurent with id: ${req.params.id} not found.`})
        return;
    }
    try{
    let query_resp = await client.query(`DELETE FROM restaurents WHERE id = ${req.params.id} RETURNING *`)
    if(query_resp.rowCount==1){
        res.status(StatusCodes.ACCEPTED).json({"status":getReasonPhrase(StatusCodes.ACCEPTED),"message":"Restaurent deleted successfully."})
    }
    }catch(err){
        console.log(err)
    }
})
module.exports = {router}