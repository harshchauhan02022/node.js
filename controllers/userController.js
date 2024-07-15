const Joi = require('joi'); // Import Joi
const userModel = require('../models/userModel');

const userController = {
  getAllUsers: (req, res) => {
    userModel.getAllUsers((err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
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

  createUser: async (req, res) => {
    const { name, email, phone, password } = req.body;

    const registerUserSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^\d+$/).min(10).max(15).required(), // Ensures phone number contains digits only
      password: Joi.string().min(6).required()
    });

    const { error } = registerUserSchema.validate({ name, email, phone, password });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      userModel.createUser({ name, email, phone, password }, (err, user) => {
        if (err) {
          if (err.message === 'User already exists') {
            return res.status(409).json({ error: "User already exists" });
          }
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json({ status: true, message: "User registered successfully.", id: user.id });
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;

    const loginUserSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });

    const { error } = loginUserSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    userModel.loginUser(email, password, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful', user });
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

    const updateUserSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().pattern(/^\d+$/).min(10).max(15).required(), // Ensures phone number contains digits only
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });

    const { error } = updateUserSchema.validate(userData);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
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
  },

  truncateTable: (req, res) => {
    userModel.truncateTable((err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Table truncated successfully" });
    });
  }
};

module.exports = userController;
