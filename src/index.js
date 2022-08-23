const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./model/dbConection');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get asma
app.get('/api/asma/', (req, res) => {
    const query = "SELECT * FROM asma";

    db.query(query, (err, result) => {
        if (err) {
            res.send('Error Query Sql');
            console.log('error');
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

app.get('/api/asma/:id_asma/', (req, res) => {
    const asmaId = req.params.id_asma;

    const query = "SELECT * FROM asma WHERE id_asma = ?";

    db.query(query, asmaId, (err, result) => {
        if (err) {
            res.send('Error Query Sql');
            console.log('error');
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
// ##########

// create asma
app.post('/api/create/', (req, res) => {
    const Asma = req.body.asma;
    const Latin = req.body.latin;
    const Arti = req.body.artinya;

    const query = "INSERT INTO asma (asma, latin, artinya) VALUE (?, ?, ?)";
    db.query(query, [Asma, Latin, Arti], (err, result) => {
        if (err) {
            res.send('Error Query Sql');
            console.log('error');
        } else {
            res.send(result, 200);
            console.log(result);
        }
    });
});
// ###########

// update asma
app.put('/api/update/:id_asma/', (req, res) => {
    const asmaId = req.params.id_asma;
    const asma = req.body.asma;
    const latin = req.body.latin;
    const arti = req.body.artinya;

    const query = "UPDATE asma SET asma = ?, latin = ?, artinya = ? WHERE id_asma = ?";
    db.query(query, [asma, latin, arti, asmaId], (err, result) => {
        if (err) {
            res.send('Error Query Sql');
            console.log('error');
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
// ############

// delete asma
app.delete('/api/delete/:id_asma/', (req, res) => {
    const asmaId = req.params.id_asma;

    const query = "DELETE FROM asma WHERE id_asma = ?";
    db.query(query, asmaId, (err, result) => {
        if (err) {
            res.send('Error Query Sql');
            console.log('error');
        } else {
            res.send('Succesfully deleted asma ul husna');
            console.log(result);
        }
    });
});
// #############

app.listen(3001, () => {
    console.log('Server running in port 3001!');
});