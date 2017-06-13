const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('events')
  },
  getOne(id) {
    return knex('events').where('id', id).first();
  },
  create(events) {
    return knex('events').insert(events, '*')
  },
  update(id, events) {
    return knex('events').where('id', id).update(events, '*')
  },
  delete(id) {
    return knex('events').where('id', id).del();
  }
}
