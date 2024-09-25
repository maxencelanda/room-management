const express = require("express")
const db = require("./db")
const { createHash } = require('crypto')
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
    db.query(`SELECT * FROM Salle WHERE idSalle = ?`, [req.params.salleId], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/creneaux/all', (req, res) => {
    db.query(`SELECT * FROM Creneau`, (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/reservation/:salleId', (req, res) => {
    db.query(`SELECT * FROM Reservation WHERE idSalle = ? AND dateReservation >= DATE(NOW())`, [req.params.salleId], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.post('/reservation/create', (req, res) => {
    const data = req.body
    db.query(`INSERT INTO Reservation VALUES(NULL, ?, ?, ?, ?, ?)`, [data.nom, data.description, data.dateReservation, data.idSalle, data.idCreneau], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json({"message": "success"});
    });
})

app.post('/utilisateur/create', (req, res) => {
    const data = req.body
    const mdp = createHash("sha256").update(data.mdp).digest("hex")
    db.query(`INSERT INTO Utilisateur VALUES(NULL, )`, [data.nom, mdp], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json({"message": "success"});
    });
})

app.listen(port, () => {
    console.log(`back listening on port ${port}`)
})