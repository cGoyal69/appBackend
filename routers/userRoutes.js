const express = require('express');
const UserController = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');
const { userValidationSchema } = require('../configs/validation');

const router = express.Router();

router.post(
  '/register', 
  validateRequest(userValidationSchema),
  UserController.registerUser
);

router.get('/users', UserController.getAllUsers);

module.exports = router;