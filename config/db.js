require('dotenv').config()
const {Client} = require("pg")
const {usermodel} = require("../models/user.model")
const {restaurentModel} = require("../models/restaurent.model")
const client = new Client({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})
async function createTableuser(){
    try{
        const check = await client.query("SELECT * FROM users")
    }catch(err){
        if(err){
            try{
            await client.query(usermodel)
            }catch(err){
                console.log(err)
            }
        }
    }
}
async function createTablerestaurent(){
    try{
        const check = await client.query("SELECT * FROM restaurents")
    }catch(err){
        if(err){
            try{
                await client.query(restaurentModel)
            }catch(err){
                console.log(err)
            }
        }
        console.log(err)
    }
}
function handleAll(){
try{
    client.connect()
    createTableuser()
    createTablerestaurent()
    }catch(err){
        console.log(err)
    }
};

module.exports = {handleAll,client};