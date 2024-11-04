const knex = require('../database/knex');

class IngredientsRepository {
  async findByName(names) {
    return await knex("Ingredients").whereIn("name", names).select("id");
  }

  async insert(names) {
    return await knex("Ingredients").insert(names.map(name => ({ name })), "id");
  }

  async findById(id) {
    return await knex("Ingredients").where({ id }).first();
  }

  async deleteById(id) {
    return await knex("Ingredients").where({ id }).delete();
  }

  async findAll() {
    return await knex("Ingredients").orderBy("id", "asc");
  }
}

module.exports = IngredientsRepository; 