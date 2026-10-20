import { useState } from 'react';

function IrritantForm({ setIrritants, irritants, setActiveTab }) {
  const nextId = irritants.length > 0 ? Math.max(...irritants.map(i => i.id)) + 1 : 1;
  const generatedCode = `IRR-${String(nextId).padStart(3, '0')}`;

  const [formData, setFormData] = useState({
    code: generatedCode,
    date: new Date().toISOString().split('T')[0],
    qui: '',
    description: '',
    impact: 'Faible',
    traitement: 'Qwick Win',
    priseEnCharge: '',
    solution: '',
    statut: 'non commencé',
    x: 5,
    y: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert("Veuillez remplir au moins la description de l'irritant.");
      return;
    }
    setIrritants([...irritants, { ...formData, id: nextId }]);
    setActiveTab('graph');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', border: '2px solid #2b2b2b', fontFamily: 'Arial, sans-serif' }}>
      
      {/* --- EN-TÊTE DE LA FICHE --- */}
      <div style={{ display: 'flex', borderBottom: '2px solid #2b2b2b', background: '#c1d7ae' }}>
        <div style={{ flex: 2, padding: '15px', borderRight: '2px solid #2b2b2b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', textTransform: 'uppercase', textAlign: 'center', color: '#1d3557' }}>
            Fiche de Suivi des Irritants UAG
          </h2>
        </div>
        <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Code irritant :</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1d3557' }}>{formData.code}</span>
        </div>
      </div>

      {/* --- FORMULAIRE DE SAISIE --- */}
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        
        {/* Ligne Date / Qui */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="input-date" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Date :</label>
            <input id="input-date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="input-qui" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Qui ? :</label>
            <input id="input-qui" type="text" placeholder="Votre nom" value={formData.qui} onChange={e => setFormData({...formData, qui: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="textarea-desc" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description de l'irritant :</label>
          <textarea id="textarea-desc" rows="3" placeholder="Décrivez le problème constaté..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical' }} />
        </div>

        {/* --- MESURE DE L'IMPACT --- */}
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Mesure de l'impact sur l'activité</div>
          <div style={{ display: 'flex', padding: '10px', gap: '20px' }}>
            {['Faible', 'Moyen', 'Elever'].map((level) => (
              <label key={level} htmlFor={`impact-${level}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input id={`impact-${level}`} type="radio" name="impact" checked={formData.impact === level} onChange={() => setFormData({...formData, impact: level})} />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* --- COMMENT TRAITÉ LE SUJET --- */}
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Comment traité le sujet :</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px', gap: '10px' }}>
            {['Qwick Win', 'Gemba Walk', 'Chantier Zone', 'Chantier Kaizen'].map((type) => (
              <label key={type} htmlFor={`traitement-${type.replace(/\s+/g, '-')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input id={`traitement-${type.replace(/\s+/g, '-')}`} type="radio" name="traitement" checked={formData.traitement === type} onChange={() => setFormData({...formData, traitement: type})} />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Sujet pris en charge par */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="input-charge" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Sujet pris en charge par : <span style={{fontSize:'12px', fontWeight:'normal', color:'#666'}}>(Magasinier / Cap / Manager / RUA)</span></label>
          <input id="input-charge" type="text" placeholder="Ex: RUA / Manager" value={formData.priseEnCharge} onChange={e => setFormData({...formData, priseEnCharge: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        {/* Solution envisagée */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="textarea-sol" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Solution envisagée :</label>
          <textarea id="textarea-sol" rows="2" placeholder="Quelle solution est proposée ?" value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical' }} />
        </div>

        {/* --- NOTATION POUR LE GRAPH --- */}
        <div style={{ marginBottom: '20px', padding: '15px', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#856404' }}>📈 Positionnement Matrice (Notes sur 10)</div>
          <div style={{ display: 'flex', gap: '20px' }}>
<div style={{ flex: 1 }}>
  <label htmlFor="range-x" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Facilité (Axe X) : {formData.x}/10</label>
  <input id="range-x" type="range" min="0" max="10" step="0.5" value={formData.x} onChange={e => setFormData({...formData, x: Number.parseFloat(e.target.value)})} style={{ width: '100%' }} />
</div>
<div style={{ flex: 1 }}>
  <label htmlFor="range-y" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Impact (Axe Y) : {formData.y}/10</label>
  <input id="range-y" type="range" min="0" max="10" step="0.5" value={formData.y} onChange={e => setFormData({...formData, y: Number.parseFloat(e.target.value)})} style={{ width: '100%' }} />
</div>
          </div>
        </div>

        {/* --- STATUT ACTUEL --- */}
        <div style={{ marginBottom: '25px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Statut Actuelle</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fafafa' }}>
            {['non commencé', 'en cours', 'Terminer'].map((statusName) => (
              <label key={statusName} htmlFor={`status-${statusName.replace(/\s+/g, '-')}`} style={{ fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input id={`status-${statusName.replace(/\s+/g, '-')}`} type="radio" name="statut" checked={formData.statut === statusName} onChange={() => setFormData({...formData, statut: statusName})} /> {statusName}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: '14px', background: '#2a9d8f', color: '#fff', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          💾 Enregistrer la fiche et placer sur le tableau
        </button>

      </form>
    </div>
  );
}

export default IrritantForm;
