const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

   // Check if user already exists
   db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
     return callback(error, null);
    }
    if (results.length > 0) {
     return callback({ message: 'User already exists' }, null);
    }

    // Insert new user
    db.query('INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)', [name, phone, email, hashPassword], (error, results) => {
     if (error) {
      return callback(error, null);
     }
     return callback(null, { id: results.insertId });
    });
   });
  } catch (error) {
   return callback(error, null);
  }
 },

 loginUser: (email, password, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
   if (error) {
    return callback(error, null);
   }

   if (results.length === 0) {
    return callback(null, null);
   }

   const user = results[0];

   bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
    if (bcryptError) {
     return callback(bcryptError, null);
    }

    if (!isMatch) {
     return callback(null, null);
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });

    const { password, ...userData } = user;
    return callback(null, { user: userData, token });
   });
  });
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
 },

 truncateTable: (callback) => {
  db.query('TRUNCATE TABLE users', (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, results);
  });
 }
};

module.exports = userModel;
