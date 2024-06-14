const db = require('../config/db');

const userModel = {
 getAllUsers: (callback) => {
  db.query('SELECT * FROM users', callback);
 },
};

module.exports = userModel;
