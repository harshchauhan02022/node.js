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

  createUser: (req, res) => {
    const userData = req.body;

    console.log('User Data:', userData);

    if (!userData.name || !userData.phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    userModel.createUser(userData, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ status: true, message: "User registered successfully." });
    });
  },
};

module.exports = userController;
