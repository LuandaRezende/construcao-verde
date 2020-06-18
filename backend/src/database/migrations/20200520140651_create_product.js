
exports.up = function(knex) {
    return knex.schema.createTable('product', function (table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        
        table.string('store_id').notNullable();

        table.foreign('store_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
