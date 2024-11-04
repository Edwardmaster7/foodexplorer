const knex = require("../database/knex");

class CategoriesRepository {
    async findByNames(names) {
        return await knex("Categories").whereIn("name", names).select("id");
    }

    async insert(categories) {
        return await knex("Categories").insert(categories);
    }

    async findById(id) {
        return await knex("Categories").where({ id }).first();
    }

    async update(id, name) {
        return await knex("Categories").where({ id }).update({ name });
    }

    async delete(id) {
        return await knex("Categories").where({ id }).delete();
    }

    async findAll() {
        return await knex("Categories").orderBy("id", "asc");
    }

    async findDishesById(id) {
        return await knex("Dishes").where({ category_id: id }).first();
    }
}

module.exports = CategoriesRepository; 