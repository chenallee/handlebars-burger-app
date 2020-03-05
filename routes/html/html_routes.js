const router = require('express').Router();

const { getBurgers } = require('../../controllers/burgers_controller');

//set up root '/' GET route to serve home page with burger data
router.get('/', (req, res) => {
  //get all burger data
  getBurgers()
  .then(burgerdata => {
    res.render('home', {burgers: burgerdata}); //refers to home.handlebars
  })
  .catch(err => {
    res.status(500).end();
  });
});

module.exports = router;