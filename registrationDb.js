// registrationDb.js

const db = require('./database');

// Function to store user registration data in the database
async function registerUser(name, email, password) {
  try {
    await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    // If successful, you can return a meaningful response or data if needed
    return { success: true, message: 'User registration successful' };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to register user');
  }
}

module.exports = {
  registerUser,
};

