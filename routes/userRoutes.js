const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getById);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.delete("/truncate", userController.truncateTable);
router.put("/:id/change-password", userController.changePassword); 
module.exports = router;
