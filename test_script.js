const pg = require('pg');
const settings = require('./settings'); // settings.json
const moment = require('moment');

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });
  

function search() {
    const input = process.argv[2];
    const query = `SELECT * FROM famous_people`; 
    let found = 0; 
    let result = []; 
    client.query(query, (err, res) => {
        if (err) throw err;        
        for (let person of res.rows) {       
            if (person.first_name === input || person.last_name === input) {
                found++;
                result.push(person);
            }
        }
        console.log('Searching...');
        console.log(`Found ${result.length} persons(s) by the name ${input}:`);
        result.forEach((e, i) => {
            console.log(`-${i + 1}: ${e.first_name} ${e.last_name} ${moment(e.birthdate).format('YYYY-MM-DD')}`)  
        });
    client.end();
    })
}
client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    search();
});
