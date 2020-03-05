// dependencies:
const mysql = require('mysql');

// load env variables
require('dotenv').config();

//check process.env.coolname for checking production VS development check

// create connection to DB: if deployed on heroku, connect on there, otherwise set up localhost
const connection = process.env.DEPLOYED_URL
  ? mysql.createConnection(process.env.DEPLOYED_URL)
  : mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  });

  //export connection so other files can use
  module.exports = connection;