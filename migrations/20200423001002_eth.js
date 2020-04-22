const ETH_INITIAL_HEIGHT = 9924600;

exports.up = function(knex) {
  return knex('heights').insert({
    currency: 'eth',
    height: ETH_INITIAL_HEIGHT
  })
};

exports.down = function(knex) {
  return knex('heights')
    .where({currency: 'eth', height: ETH_INITIAL_HEIGHT})
    .del();
};
