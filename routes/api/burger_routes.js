const router = require('express').Router();

const { getBurgers, createBurger, updateBurger, deleteBurger } = require('../../controllers/burgers_controller');

//create full CRUD routes at `/burgers` (which is actually `/api/burgers`... see index.js)

/* GET => Get All  Burgers */
router.get('/burgers', (req, res) => {
  getBurgers()
    .then(burgerdata => {
      res.status(200).json(burgerdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/* POST => Add Burger */
router.post('/burgers', (req, res) => {
  //req.body => {burger_name: 'Mushroom Swiss Burger'}
  createBurger(req.body)
    .then(burgerdata => {
      res.status(200).json(burgerdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/* PUT => Update Burger: devoured: true OR false */
router.put('/burgers/:id', (req, res) => {
  updateBurger(req.body, req.params.id)
    .then(burgerdata => {
      if (burgerdata.code === 404) { //if query connected but nothing updated
        return res.status(404).json(burgerdata); //return 404 and escape
      }
      res.status(200).json(burgerdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/* DELETE => Delete Burger */
router.delete('/burgers/:id', (req, res) => {
  //console.log(req.params.id);
  deleteBurger(req.params.id)
    .then(burgerdata => {
      if (burgerdata.code === 404){ //if query connected but nothing deleted
        return res.status(404).json(burgerdata); //return 404 and escape
      }
      res.status(200).json(burgerdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;