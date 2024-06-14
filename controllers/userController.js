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
};

module.exports = userController;
