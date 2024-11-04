const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    return await knex("Users")
      .where("email", email)
      .first();
  }

  async create({ name, email, password, isAdmin }) {
    await knex("Users").insert({
      name,
      email,
      password,
      isAdmin: isAdmin ? true : false
    });
  }

  async findById(id) {
    return await knex("Users")
      .where({ id })
      .first();
  }

  async update(id, { name, email, password }) {
    await knex("Users")
      .where({ id })
      .update({
        name,
        email,
        password,
        updated_at: knex.fn.now()
      });
  }

  async show(id) {
    return await knex("Users")
      .select("name", "email", "isAdmin", "created_at", "updated_at")
      .where({ id })
      .first();
  }
}

module.exports = UserRepository;