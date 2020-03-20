require('dotenv').config();
const env = process.env;

exports.development =  {
  "username": env.DB_ID,
  "password": env.DB_PW,
  "database": "project8",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
};
