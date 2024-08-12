
exports.up = (knex) => {
    return knex.schema.createTable('Dishes', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.decimal('price', 8, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('Dishes');
};
