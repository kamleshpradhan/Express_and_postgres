const Joi = require("joi")
const restaurentModel = `CREATE TABLE restaurents(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    locations VARCHAR(50) NOT NULL,
    price_range int NOT NULL check(price_range>=1 and price_range<=5)
);`;

const restuarentSchema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    locations:Joi.string().min(3).max(30).required(),
    price_range:Joi.number().max(5)
})
module.exports = {restaurentModel,restuarentSchema}