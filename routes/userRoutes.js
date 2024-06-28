const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getById);
router.post("/register", userController.createUser);
router.delete("/:id", userController.deleteUser); // Delete route
router.put("/:id", userController.updateUser);    // Update route

module.exports = router;
