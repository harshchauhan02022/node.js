const bcrypt = require('bcrypt');
const db = require('../config/db');


const userModel = {
 getAllUsers: (callback) => {
  db.query('SELECT * FROM users', (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, results);
  });
 },

 getById: (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, results);
  });
 },

 async createUser(userData, callback) {
  const { name, phone, email, password } = userData;

  try {
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);

   db.query('INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)', [name, phone, email, hashPassword], (error, results) => {
    if (error) {
     return callback(error, null);
    }
    return callback(null, { id: results.insertId });
   });
  } catch (error) {
   return callback(error, null);
  }
 },

 deleteUser: (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, results);
  });
 },

 updateUser: (id, userData, callback) => {
  const { name, phone, email } = userData;
  db.query(
   'UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?',
   [name, phone, email, id],
   (error, results) => {
    if (error) {
     return callback(error, null);
    }
    return callback(null, results);
   }
  );
 }
};

module.exports = userModel;
