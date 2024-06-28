const userModel = require('../models/userModel');

const userController = {
  getAllUsers: (req, res) => {
    userModel.getAllUsers((err, results) => {
      if (err) {
        return res.status(500).json({ errosr: "Internal Server Error" });
      }
      return res.status(200).json({ userlist: results });
    });
  },

  getById: (req, res) => {
    userModel.getById(req.params.id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results[0]);
    });
  },

  createUser: (req, res) => {
    const userData = req.body;

    if (!userData.name || !userData.phone || !userData.email || !userData.password) {
      return res.status(400).json({ error: "Name, phone, email and password are required" });
    }

    userModel.createUser(userData, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ status: true, message: "User registered successfully." });
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;

    userModel.deleteUser(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    });
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    if (!userData.name || !userData.phone || !userData.email) {
      return res.status(400).json({ error: "Name, phone, and email are required" });
    }

    userModel.updateUser(userId, userData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ message: "User updated successfully" });
    });
  }
};

module.exports = userController;
