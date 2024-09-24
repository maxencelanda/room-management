const express = require("express")
const mysql = require('mysql')
var cors = require('cors');
const app = express()
const port = 3000

app.use(cors({origins: "http://10.60.136.157:8080"}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'roomdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/etages/all', (req, res) => {
    db.query('SELECT * FROM Etage', (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/salles/all', (req, res) => {
    db.query('SELECT * FROM Salle', (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.listen(port, () => {
    console.log(`back listening on port ${port}`)
})