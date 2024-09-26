const express = require("express")
const db = require("./db")
const verifyToken = require("./jwtauth")
const { createHash } = require('crypto')
const jwt = require('jsonwebtoken');
require('dotenv').config()
var cors = require('cors');
const app = express()
const port = 3000

app.use(express.json())
app.use(cors({origins: `http://${process.env.IP}:8080`}));

app.post('/utilisateur/create', (req, res) => {
    const data = req.body
    const mdp = createHash("sha256").update(process.env.SALT + data.mdp).digest("hex")
    db.query(`INSERT INTO Utilisateur VALUES(NULL, ?, ?, ?)`, [data.nom, mdp, data.idRole], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error creating user');
          return;
        }
        res.json({"message": "success"});
    });
})

app.post('/utilisateur/login', (req, res) => {
    const data = req.body
    const mdp = createHash("sha256").update(process.env.SALT + data.mdp).digest("hex")
    db.query(`SELECT idUtilisateur, idRole FROM Utilisateur WHERE nom = ? AND mdp = ?`, [data.nom, mdp], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching user');
          return;
        }
        if (results.length == 0){
            res.json({"error": "Utilisateur ou mot de passe incorrect"})
            return;
        }
        console.log(results)
        const token = jwt.sign({idUtilisateur: results[0]["idUtilisateur"], idRole: results[0]["idRole"]}, process.env.TOKEN_SECRET, { expiresIn: '1h',})
        res.json({"token": token});
    });
})

app.get('/etages/all', verifyToken, (req, res) => {
    db.query('SELECT * FROM Etage', (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/salles/all', verifyToken, (req, res) => {    
    console.log(req)
    db.query('SELECT * FROM Salle', (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/salles/:salleId', verifyToken, (req, res) => {
    db.query(`SELECT * FROM Salle WHERE idSalle = ?`, [req.params.salleId], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/creneaux/all', verifyToken, (req, res) => {
    db.query(`SELECT * FROM Creneau`, (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.get('/reservation/:salleId/:day', verifyToken, (req, res) => {
    db.query(`SELECT C.horaire, R.idReservation, R.description, R.dateReservation, U.nom, U.idRole FROM Creneau AS C LEFT JOIN Reservation AS R ON C.idCreneau = R.idCreneau AND R.idSalle = ? AND R.dateReservation = ? LEFT JOIN Utilisateur AS U ON R.idUtilisateur = U.idUtilisateur;`, [req.params.salleId, req.params.day], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    });
})

app.post('/reservation/create', verifyToken, (req, res) => {
    const data = req.body
    const idUtilisateur = req.idUtilisateur
    const idRole = req.idRole
    if (idRole == 1){
        res.json({"error": "Role non autorisé"})
        return;
    }
    db.query(`INSERT INTO Reservation VALUES(NULL, ?, ?, ?, ?, ?)`, [data.description, data.dateReservation, idUtilisateur, data.idSalle, data.idCreneau], (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json({"message": "success"});
    });
})

app.delete('/reservation/delete', verifyToken, (req, res) => {
    const data = req.body
    const idUtilisateur = req.idUtilisateur
    const idRole = req.idRole;
    let delQuery = `DELETE FROM Reservation WHERE idReservation = ?`
    let values = [data.idReservation]
    if (idRole == 1){
        res.json({"error": "Role non autorisé"})
        return;
    } else if (idRole == 2){
        delQuery = `DELETE FROM Reservation WHERE idReservation = ? AND idUtilisateur = ?`
        values.push(idUtilisateur)
    }
    db.query(delQuery, values, (err, results) => {
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