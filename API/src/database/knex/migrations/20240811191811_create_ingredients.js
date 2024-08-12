
exports.up = (knex) => {
  return knex.schema.createTable('Ingredients', function(table) {
    table.increments('id').primary().notNullable().unique();
    table.string('name').notNullable();
  });
};

exports.down = (knex) => {
    return knex.schema.dropTable('Ingredients');
};
