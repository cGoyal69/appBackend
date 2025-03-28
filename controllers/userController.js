const { pool } = require('../configs/database');
const responseHandler = require('../utils/responseHandler');

class UserController {
  static async registerUser(req, res, next) {
    const connection = await pool.getConnection();
    
    try {
      const { name, email, phone } = req.body;

      // Check if email already exists
      const [existingUsers] = await connection.query(
        'SELECT * FROM USERS WHERE email = ?', 
        [email]
      );

      if (existingUsers.length > 0) {
        return responseHandler.conflict(res, 'Email already registered');
      }

      // Insert new user
      const [result] = await connection.query(
        'INSERT INTO USERS (name, email, phone) VALUES (?, ?, ?)', 
        [name, email, phone]
      );

      // Retrieve the newly created user
      const [newUsers] = await connection.query(
        'SELECT * FROM USERS WHERE id = ?', 
        [result.insertId]
      );

      responseHandler.created(res, 'User registered successfully', newUsers[0]);
    } catch (error) {
      next(error);
    } finally {
      connection.release();
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const [users] = await pool.query('SELECT * FROM USERS');
      responseHandler.success(res, 'Users retrieved successfully', users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;