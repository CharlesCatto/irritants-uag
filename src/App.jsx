import { useState, useEffect } from 'react';
import IrritantForm from './components/IrritantForm';
import IrritantGraph from './components/IrritantGraph';

function App() {
  const [activeTab, setActiveTab] = useState('graph');
  const [irritants, setIrritants] = useState([]);

  // Récupérer les données du serveur Express au démarrage et à chaque changement d'onglet
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    fetch('http://localhost:5000/api/irritants')
      .then(response => response.json())
      .then(data => {
        // Adaptation des données serveur (score_facilite, score_impact) pour notre composant Graphique
        const formatData = data.map(item => ({
          ...item,
          id: item.id_irritant,
          code: item.code || `IRR-${String(item.id_irritant).slice(-3)}`, // Secours si le code n'est pas encore en DB
          x: item.score_facilite,
          y: item.score_impact,
          qui: item.qui || 'Collaborateur'
        }));
        setIrritants(formatData);
      })
      .catch(error => console.error("Erreur de récupération des données :", error));
  }, [activeTab]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Fiche et Tableau de Suivi des Irritants UAG</h1>
        
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button 
            type="button"
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
          <button 
            type="button"
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
