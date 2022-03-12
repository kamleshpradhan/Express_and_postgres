const restaurentModel = `CREATE TABLE restaurents(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    locations VARCHAR(50) UNIQUE NOT NULL,
    price_range int NOT NULL check(price_range>=1 and price_range<=5)
);`;

module.exports = {restaurentModel}