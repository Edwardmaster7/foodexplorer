
exports.up = (knex) => {
    return knex.schema.createTable('Users', function(table) {
        table.boolean('isAdmin').defaultTo(false);
        table.increments('id').primary().notNullable().unique();
        table.string('name');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
    });
  };

exports.down = (knex) => {
    return knex.schema.dropTable('Users');
  };
