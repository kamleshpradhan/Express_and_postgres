const Joi = require("joi")
const usermodel = `CREATE TABLE users (
	user_id BIGSERIAL PRIMARY KEY,
	username VARCHAR  UNIQUE NOT NULL,
	password VARCHAR  NOT NULL,
	email VARCHAR  UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
)`
const userSchema = Joi.object({
    username:Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


module.exports = {userSchema,usermodel}