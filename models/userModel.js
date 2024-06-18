const db = require('../config/db');

const userModel = {
 getAllUsers: (callback) => {
  db.query('SELECT * FROM users', callback);
 },

 createUser: (userData, callback) => {
  const { name, phone } = userData;

  db.query('INSERT INTO users (name, phone) VALUES (?, ?)', [name, phone], (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, { id: results.insertId });
  });
 }
};

module.exports = userModel;
