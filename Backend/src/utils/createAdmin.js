const readline = require('readline');
const knex = require('../database/knex'); // Adjust the path as necessary
const { encrypt } = require('../configs/crypto'); // Adjust the path as necessary

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter admin email: ', async (email) => {
  rl.question('Enter admin password: ', async (password) => {
    try {
      const hashedPassword = await encrypt(password);
      await knex('Users').insert({
        email,
        password: hashedPassword,
        isAdmin: true
      });
      console.log('Admin user created successfully.');
    } catch (error) {
      console.error('Error creating admin user:', error);
    } finally {
      rl.close();
      knex.destroy();
    }
  });
});