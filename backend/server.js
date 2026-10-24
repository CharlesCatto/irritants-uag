/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connexion à la base de données SQLite (fichier persistant)
const dbPath = path.resolve(__dirname, 'irritants.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erreur d'ouverture de la base de données", err.message);
    } else {
        console.log("Connecté à la base SQLite persistante (irritants.db).");
    }
});

// Initialisation automatique via le fichier database.sql
const initSqlPath = path.resolve(__dirname, 'database.sql');
if (fs.existsSync(initSqlPath)) {
    const sqlScript = fs.readFileSync(initSqlPath, 'utf8');
    db.exec(sqlScript, (err) => {
        if (err) {
            console.error("Erreur lors de l'initialisation du script SQL :", err.message);
        } else {
            console.log("Base de données initialisée et synchronisée avec database.sql !");
        }
    });
}

// Routes API
app.get('/api/irritants', (req, res) => {
    db.all("SELECT * FROM irritants", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/irritants', (req, res) => {
    const {
        code, date, qui, description, impact, 
        traitement, prise_en_charge, solution, 
        statut, score_impact, score_facilite, id_utilisateur
    } = req.body;

    const query = 'INSERT INTO irritants (code, date, qui, description, impact, traitement, prise_en_charge, solution, statut, score_impact, score_facilite, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.run(query, [
        code || `IRR-${Math.floor(100 + Math.random() * 900)}`,
        date || new Date().toISOString().split('T')[0],
        qui || 'Anonyme',
        description,
        impact || 'Faible',
        traitement || 'Quick Win',
        prise_en_charge || '',
        solution || '',
        statut || 'Non commencé',
        score_impact || 5,
        score_facilite || 5,
        id_utilisateur || 1
    ], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            id_irritant: this.lastID,
            ...req.body
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur Express démarré sur http://localhost:${PORT}`);
});