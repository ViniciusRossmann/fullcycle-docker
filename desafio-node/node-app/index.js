const express = require('express');
const mysql = require('mysql');
const moniker = require('moniker');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const name = moniker.choose();
  const sql = `INSERT INTO people(name) VALUES('${name}')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    
    connection.query('SELECT * FROM people', (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach(person => {
        response += `<li>${person.name}</li>`;
      });
      response += '</ul>';

      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});