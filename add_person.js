var knex = require('knex')({
    client: 'pg',
    connection: {
      "user": "development",
      "password": "development",
      "database": "test_db",
      "hostname": "localhost",
      "port": 5432,
      "ssl": true
    }
  });


var input = process.argv[2];
//----Search with condition w/ argv---

knex('famous_people').where('first_name', input).orWhere('last_name', input)
.select().asCallback((err, res) => {
  res.forEach((e) => {
    console.log(e.first_name, e.last_name, e.birthdate)
  });
  knex.destroy();
});

//-----Insert new data--------
function addPerson (firstName, lastName, dateOfBirth) {
  knex('famous_people')
    .insert([{
      first_name: firstName,
      last_name: lastName,
      birthdate: dateOfBirth
    }])
    .asCallback((err, res) => {
      if (err)
      console.log('err', err)
      console.log(res);
  })
  knex.destroy();
}










  