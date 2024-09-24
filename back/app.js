const express = require("express")
const db = require("./db")
var cors = require('cors');
const app = express()
const port = 3000

app.use(cors({origins: `http://10.60.137.63:8080`}));

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

app.get('/salles/:salleId', (req, res) => {
    db.query(`SELECT * FROM Salle WHERE idSalle = ${req.params.salleId}`, (err, results) => {
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