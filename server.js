const express = require('express');
const expressHandlebars = require('express-handlebars');

// create express app
const app = express();
// set port
const PORT = process.env.PORT || 3001;

// import DB connection
const connection = require('./config/connection');

// import routes
const routes = require('./routes'); //this will look for an index.js file in the root of the /routes folder

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main'})); //how to describe this
app.set('view engine', 'handlebars'); //how to describe this

// set up an turn on routes
app.use(routes);

// connect to db
connection.connect(err => {
  if (err){
    throw new Error(err);
  }

  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`)); //compare diff ways to do this
});