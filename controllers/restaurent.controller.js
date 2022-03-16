const express = require("express")
const {client} = require("../config/db")
const router = express.Router()
const {restuarentSchema:schema} = require("../models/restaurent.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode,} = require('http-status-codes');
router.get("",async(req,res)=>{
    try{
    const response  = await client.query("SELECT * FROM restaurents")
    res.status(200).send(response.rows)
    }catch(err){
        console.log(err)
        res.send("Something broke")
    }
})
router.get("/:id",async(req,res)=>{
    try{
        // to prevent sql injection we use the array or parametrised query
        const response = await client.query(`SELECT * FROM restaurents WHERE id = $1`,[req.params.id])
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
            res.status(StatusCodes.ACCEPTED).json({status:getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED),reason:"Restaurent is already present."})
            return
        }
    }
    try{
        const value = await schema.validateAsync({name:req.body.name,locations:req.body.location,price_range:req.body.price});
        const insert_query = "INSERT INTO restaurents(name,locations,price_range) VALUES($1,$2,$3) RETURNING *"
        const response = await client.query(insert_query,[value.name,value.locations,value.price_range])
        if(response){
         res.status(StatusCodes.CREATED).json({message:getReasonPhrase(StatusCodes.CREATED)})
     }
     }catch(err){
         res.status(StatusCodes.ACCEPTED).json({status:getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED), reason:err["details"]})
     }
})


router.put("/:id",async(req,res)=>{
    let resp = await client.query(`SELECT * FROM restaurents WHERE id = $1`,[req.params.id])
    if(resp.rowCount==0){
        res.status(StatusCodes.NOT_FOUND).json({"message":`Restaurent with id: ${req.params.id} not found.`})
        return;
    }
    try{
    const response = await client.query("UPDATE restaurents SET name=$1 ,locations=$2,price_range=$3 WHERE id=$4 returning *",[req.body.name,req.body.locations,req.body.price_range,req.params.id])
    if(response){
        res.status(StatusCodes.ACCEPTED).json({"status":getReasonPhrase(StatusCodes.ACCEPTED),"message":response.rows[0]})
    }
    }catch(err){
        console.log(err)
        res.status(StatusCodes.BAD_GATEWAY).json({status:getReasonPhrase(StatusCodes.BAD_GATEWAY),"message":"Update was not completed"})
    }
})


router.delete("/:id",async(req,res)=>{
    let resp = await  client.query(`SELECT * FROM restaurents WHERE id = $1`,[req.params.id])
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