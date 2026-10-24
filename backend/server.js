/* eslint-disable no-undef */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de base nécessaires
app.use(cors()); // Autorise ton React (port 5173) à parler à ton Express (port 5000)
app.use(express.json()); // Permet à Express de lire le format JSON envoyé par ton formulaire

// Variables d'exemples temporaires (Ton modèle JS en attendant MySQL)
const simulationDB = [
  { id_irritant: 101, description: "Fiches papier d'irritants perdues ou illisibles", statut: "En cours", score_impact: 8, score_facilite: 4, id_utilisateur: 1 },
  { id_irritant: 102, description: "Temps d'attente trop long pour validation managers", statut: "A l'etude", score_impact: 6, score_facilite: 7, id_utilisateur: 2 }
];

// --- PIPELINE / ROUTES ---

// 1. GET : Nourrit le graphique React avec les données
app.get('/api/irritants', (req, res) => {
  res.json(simulationDB);
});

// 2. POST : Récupère une nouvelle fiche du formulaire et l'ajoute
app.post('/api/irritants', (req, res) => {
  const nouvelIrritant = {
    id_irritant: Date.now(), // ID temporaire
    ...req.body
  };
  simulationDB.push(nouvelIrritant);
  res.status(201).json(nouvelIrritant);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${PORT}`);
});
