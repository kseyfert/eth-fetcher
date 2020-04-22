
exports.up = function(knex) {
  return knex.schema
    .createTable('heights', function (table) {
      table.increments('id');
      table.string('currency', 255).unique().notNullable();
      table.integer('height').notNullable();
    })
    .createTable('blocks', function (table) {
      table.increments('id');
      table.string('currency', 255).notNullable();
      table.integer('height').notNullable();
      table.json('data').notNullable();

      table.unique(['currency', 'height']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('heights')
    .dropTable('blocks');
};
