const knex = require("../database/knex");

class SessionsRepository {
  async findUserByEmail(email) {
    return await knex("Users")
      .where('email', email)
      .first();
  }
}

module.exports = SessionsRepository; 