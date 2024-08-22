
exports.up = (knex) => {
  return knex.schema.createTable('Addresses', function(table) {
    table.increments('id').primary().notNullable().unique();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('name').notNullable();
    table.string('street').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('zip').notNullable();
    table.string('country').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  }).then(() => {
    return knex.raw(`
      CREATE TRIGGER update_addresses_timestamp
      BEFORE UPDATE ON Addresses
      FOR EACH ROW
      BEGIN
        UPDATE Addresses SET updated_at = datetime('now') WHERE id = NEW.id;
      END;
    `);
  });
};

exports.down = (knex) => {
    return knex.schema.dropTable('Addresses');
};
