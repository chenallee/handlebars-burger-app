const connection = require('../config/connection');

// get all burgers
const getBurgers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers', (err, burgerdata) => {
      if (err) {
        console.log(err);
        //goes to promise's .catch():
        return reject(err);
      }
      //goes to promise's .then():
      resolve(burgerdata);
    });
  });
}

// add new burger
/* --------------------------------
  accepts object parameter => 
  {burger_name: 'Feta Turkey Burger'}
----------------------------------- */
const createBurger = burgerObj => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO burgers SET ?', burgerObj, (err, burgerdata) => {
      if (err) {
        console.log(err);
        //goes to promise's .catch():
        return reject(err);
      }
      //goes to promise's .then():
      resolve(burgerdata);
    });
  });
}

// update burger's devoured status
/* --------------------------------
  burgerObj => 
  {devoured: true} OR {devoured: false}
----------------------------------- */
const updateBurger = (burgerObj, burgerId) => {
  return new Promise ((resolve, reject) => {
    connection.query('UPDATE burgers SET ? WHERE id = ?', [burgerObj, burgerId], (err, burgerdata) => {
      if (err) {
        console.log(err);
        //goes to promise's .catch():
        return reject(err);
      } else if (burgerdata.affectedRows === 0){ // if query connects but nothing to update
        //goes to promise's .then():
        return resolve({ message: `Couldn't find a burger with that id!`, code: 404 });
      }
      //goes to promise's .then():
      resolve({ messahe: 'Burger updated!', code: 200});
    });
  });
}

// delete burger
const deleteBurger = burgerId => {
  return new Promise ((resolve, reject) => {
    //console.log(burgerId);
    connection.query('DELETE FROM burgers WHERE id = ?', [burgerId], (err, burgerdata) => {
      if (err) {
        console.log(err);
        //goes to promise's .catch():
        return reject(err);
      } else if (burgerdata.affectedRows === 0){ // if query connects but nothing to delete
        //goes to promise's .then():
        return resolve({ message: `Couldn't find a burger with that id!`, code: 404 });
      }
      //goes to promise's .then():
      resolve({ messahe: 'Burger deleted!', code: 200});
    });
  });
}

module.exports = {
  getBurgers, createBurger, updateBurger, deleteBurger
}