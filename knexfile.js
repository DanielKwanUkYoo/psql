// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      "user": "development",
      "password": "development",
      "database": "test_db",
      "hostname": "localhost",
      "port": 5432,
      "ssl": true
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
