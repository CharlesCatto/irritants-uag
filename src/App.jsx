import { useState } from 'react';
import IrritantForm from './components/IrritantForm';
import IrritantGraph from './components/IrritantGraph';

function App() {
  // Gestion de l'onglet actif : 'graph' ou 'form'
  const [activeTab, setActiveTab] = useState('graph');

  // État global pour stocker la liste des irritants
  const [irritants, setIrritants] = useState([
    { id: 1, code: "IRR-001", qui: "Charles", date: "2026-10-20", desc: "Exemple d'irritant", impact: "Moyen", solution: "Faire une app React", statut: "en cours", x: 6, y: 5 }
  ]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Fiche et Tableau de Suivi des Irritants UAG</h1>
        
        {/* Barre de navigation */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button type='button'
            onClick={() => setActiveTab('graph')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: activeTab === 'graph' ? '#007bff' : '#f0f0f0',
              color: activeTab === 'graph' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          >
            📊 Graphique / Matrice
          </button>
          <button type='button'
            onClick={() => setActiveTab('form')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: activeTab === 'form' ? '#007bff' : '#f0f0f0',
              color: activeTab === 'form' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          >
            📝 Nouveau Formulaire
          </button>
        </nav>
      </header>

      {/* Affichage conditionnel de la fenêtre active */}
      <main style={{ marginTop: '20px' }}>
        {activeTab === 'graph' ? (
          <IrritantGraph irritants={irritants} />
        ) : (
          <IrritantForm setIrritants={setIrritants} irritants={irritants} setActiveTab={setActiveTab} />
        )}
      </main>
    </div>
  );
}

export default App;
