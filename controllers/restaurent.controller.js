const express = require("express")
const {client} = require("../config/db")
const router = express.Router()
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
router.get("",async(req,res)=>{
    try{
        const response = await client.query(`SELECT * FROM restaurents WHERE id = ${req.params.id}`)
        res.status(StatusCodes.OK).json({"restaurent":response.rows})
    }catch(err){
        console.log(err)
        res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({error:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)})
    }
})

module.exports = {router}