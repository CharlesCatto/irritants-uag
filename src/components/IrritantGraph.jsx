import { useState } from 'react';

function IrritantGraph({ irritants }) {
  // Optionnel : un état pour afficher le détail d'une idée au survol ou au clic
  const [selectedIrritant, setSelectedIrritant] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '10px' }}>
      
      {/* Container principal de la matrice */}
      <div style={{ 
        position: 'relative', 
        width: '650px', 
        height: '650px', 
        border: '4px solid #333', 
        background: '#fdfdfd',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        margin: '20px auto'
      }}>
        
        {/* --- AXE VERTICAL (Grosse flèche bleue) --- */}
        <div style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '40px', 
          bottom: '40px', 
          width: '30px', 
          background: '#0074d9', 
          transform: 'translateX(-50%)',
          zIndex: 1
        }}>
          {/* Pointe de la flèche du haut */}
         {/* Pointe de la flèche du haut (Balise corrigée en auto-fermante '/>') */}
<div style={{
  position: 'absolute',
  top: '-35px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '30px solid transparent',
  borderRight: '30px solid transparent',
  borderBottom: '35px solid #0074d9'
}} />

          {/* Texte Axe Vertical */}
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%) rotate(-90deg)', color: '#fff', fontWeight: 'bold', fontSize: '11px', whiteSpace: 'nowrap' }}>IMPORTANT</div>
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%) rotate(-90deg)', color: '#fff', fontWeight: 'bold', fontSize: '11px', whiteSpace: 'nowrap' }}>PEU IMPACTANT</div>
        </div>

        {/* --- AXE HORIZONTAL (Grosse bande bleue) --- */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '40px', 
          right: '40px', 
          height: '30px', 
          background: '#0074d9', 
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          {/* Texte Axe Horizontal */}
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#fff', fontWeight: 'bold', fontSize: '11px' }}>PAS FACILE</div>
          <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#fff', fontWeight: 'bold', fontSize: '11px' }}>FACILE</div>
        </div>

        {/* --- TEXTES DE HAUT/BAS DE CADRAN (Fidèles au tableau blanc) --- */}
        {/* Titre général haut */}
        <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px', color: '#333' }}>
          TABLEAU DE SUIVI DES IRRITANTS UAG
        </div>

        {/* Cadran Top-Left : Pas Facile / Important */}
        <div style={{ position: 'absolute', top: '45px', left: '15px', maxWidth: '240px', color: '#555', fontSize: '11px', fontWeight: 'bold' }}>
          PAS FACILE / IMPORTANT <br />
          <span style={{ fontWeight: 'normal', color: '#888' }}>Chantier zone / Kaizen</span>
        </div>

        {/* Cadran Top-Right : Facile / Important */}
        <div style={{ position: 'absolute', top: '45px', right: '15px', maxWidth: '240px', textAlign: 'right', color: '#555', fontSize: '11px', fontWeight: 'bold' }}>
          FACILE / IMPORTANT <br />
          <span style={{ fontWeight: 'normal', color: '#888' }}>QuickWin encadrement</span>
        </div>

        {/* Cadran Bottom-Left : Pas Facile / Peu Important */}
        <div style={{ position: 'absolute', bottom: '45px', left: '15px', maxWidth: '240px', color: '#555', fontSize: '11px', fontWeight: 'bold' }}>
          PAS FACILE / PEU IMPORTANT <br />
          <span style={{ fontWeight: 'normal', color: '#888' }}>On renonce pour l'instant</span>
        </div>

        {/* Cadran Bottom-Right : Facile / Peu Important */}
        <div style={{ position: 'absolute', bottom: '45px', right: '15px', maxWidth: '240px', textAlign: 'right', color: '#555', fontSize: '11px', fontWeight: 'bold' }}>
          FACILE / PEU IMPORTANT <br />
          <span style={{ fontWeight: 'normal', color: '#888' }}>QuickWin magasinier</span>
        </div>


        {/* --- PLACEMENT DYNAMIQUE DES IRRITANTS --- */}
        {irritants.map((item) => {
          // Transformation des notes 0-10 en pourcentages responsifs
          // Pour éviter que les bulles se fassent couper sur les bords extérieurs, 
          // on applique une marge de sécurité (de 5% à 95% au lieu de 0% à 100%)
          const paddingSafety = 8; 
          const leftPercent = paddingSafety + (item.x / 10) * (100 - paddingSafety * 2);
          const bottomPercent = paddingSafety + (item.y / 10) * (100 - paddingSafety * 2);

          // Déterminer la couleur de la pastille selon le statut actuel
          let statusColor = '#e63946'; // Rouge par défaut (non commencé)
          if (item.statut === 'en cours') statusColor = '#f5a623'; // Orange
          if (item.statut === 'Terminer') statusColor = '#2a9d8f'; // Vert

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIrritant(selectedIrritant?.id === item.id ? null : item)}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                bottom: `${bottomPercent}%`,
                transform: 'translate(-50%, 50%)',
                backgroundColor: statusColor,
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                border: '2px solid #fff',
                boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                zIndex: 10,
                whiteSpace: 'nowrap',
                transition: 'transform 0.2s ease'
              }}
              title={`${item.code} - ${item.qui}`}
            >
              📌 {item.code}
            </button>
          );
        })}
      </div>

      {/* --- PANNEAU DE DÉTAIL EN DESSOUS (Optionnel mais ultra pratique) --- */}
      {selectedIrritant && (
        <div style={{ 
          width: '650px', 
          padding: '15px', 
          background: '#f8f9fa', 
          border: '1px solid #ddd', 
          borderRadius: '6px',
          boxSizing: 'border-box'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#0074d9' }}>
            {selectedIrritant.code} — Proposé par {selectedIrritant.qui || 'Anonyme'} le {selectedIrritant.date}
          </h4>
          <p style={{ margin: '5px 0' }}><strong>Description :</strong> {selectedIrritant.description}</p>
          <p style={{ margin: '5px 0' }}><strong>Solution envisagée :</strong> {selectedIrritant.solution || 'Aucune renseignée'}</p>
          <p style={{ margin: '5px 0' }}>
            <strong>Action :</strong> <span style={{ textTransform: 'uppercase', fontSize: '11px', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{selectedIrritant.traitement}</span>
            {" | "}
            <strong>Statut :</strong> <span style={{ fontWeight: 'bold' }}>{selectedIrritant.statut}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default IrritantGraph;
