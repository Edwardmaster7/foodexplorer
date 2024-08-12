exports.up = (knex) => {
    return knex.schema.createTable('Orders', function(table) {
      table.increments('id').primary().notNullable().unique();
      table.integer('user_id').notNullable().references('id').inTable('Users');
      table.string('status').notNullable().defaultTo('pending');
      table.decimal('total_price', 8, 2).notNullable().defaultTo(0.00);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('Orders');
  };
  