const { usersBase } = require('../config/airtable');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class User {
  static async findByEmail(email) {
    try {
      const records = await usersBase('Users')
        .select({
          filterByFormula: `{email} = '${email}'`,
          maxRecords: 1
        })
        .firstPage();
      
      return records[0];
    } catch (error) {
      throw new Error('Failed to find user: ' + error.message);
    }
  }

  static async create({ email, password }) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Generate unique userId
      const userId = uuidv4();

      const records = await usersBase('Users').create([
        {
          fields: {
            userId,
            email,
            password: hashedPassword
          }
        }
      ]);

      if (!records || records.length === 0) {
        throw new Error('Failed to create user record');
      }

      return {
        userId: records[0].fields.userId,
        email: records[0].fields.email
      };
    } catch (error) {
      console.error('User creation error:', error);
      throw new Error('Failed to create user: ' + error.message);
    }
  }
}

module.exports = User; 