
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.text("name").notNullable();
    table.date("date").notNullable();
    table.time("time")
    table.text("location");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
