import { useState } from 'react';

function IrritantSearch({ irritants }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('all'); // 'all', 'code', 'qui', 'description', 'solution'
    const [selectedStatut, setSelectedStatut] = useState('Tous');
    const [selectedImpact, setSelectedImpact] = useState('Tous');

    // Filtrage dynamique avec ciblage par champ
    const filteredIrritants = irritants.filter(item => {
        const term = searchTerm.toLowerCase();
        
        let matchesSearch = true;
        if (term.trim() !== '') {
            if (searchField === 'code') {
                matchesSearch = item.code?.toLowerCase().includes(term);
            } else if (searchField === 'qui') {
                matchesSearch = item.qui?.toLowerCase().includes(term);
            } else if (searchField === 'description') {
                matchesSearch = item.description?.toLowerCase().includes(term);
            } else if (searchField === 'solution') {
                matchesSearch = item.solution?.toLowerCase().includes(term);
            } else {
                // Recherche globale par défaut
                matchesSearch = 
                    item.code?.toLowerCase().includes(term) ||
                    item.description?.toLowerCase().includes(term) ||
                    item.qui?.toLowerCase().includes(term) ||
                    item.solution?.toLowerCase().includes(term);
            }
        }

        const matchesStatut = selectedStatut === 'Tous' || item.statut === selectedStatut;
        const matchesImpact = selectedImpact === 'Tous' || item.impact === selectedImpact;

        return matchesSearch && matchesStatut && matchesImpact;
    });

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ textAlign: 'center', color: '#1d3557', marginBottom: '20px' }}>
                🔍 Recherche et Filtres Avancés ({filteredIrritants.length} / {irritants.length})
            </h3>

            {/* Barre de filtres */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', background: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #ddd' }}>
                
                {/* Sélecteur de champ de recherche */}
                <div style={{ flex: 1, minWidth: '160px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Chercher dans :</label>
                    <select 
                        value={searchField}
                        onChange={e => setSearchField(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="all">Partout (Global)</option>
                        <option value="code">Code (ex: IRR-201)</option>
                        <option value="qui">Auteur / Nom (Qui)</option>
                        <option value="description">Description</option>
                        <option value="solution">Solution</option>
                    </select>
                </div>

                {/* Champ de saisie du texte */}
                <div style={{ flex: 2, minWidth: '220px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Mot-clé :</label>
                    <input 
                        type="text" 
                        placeholder={
                            searchField === 'code' ? "Ex: IRR-201..." :
                            searchField === 'qui' ? "Ex: Mehdi, Thomas..." :
                            searchField === 'description' ? "Ex: bacs, écran..." : "Rechercher..."
                        }
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Statut :</label>
                    <select 
                        value={selectedStatut}
                        onChange={e => setSelectedStatut(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="Tous">Tous</option>
                        <option value="Non commencé">Non commencé</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>

                <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Impact :</label>
                    <select 
                        value={selectedImpact}
                        onChange={e => setSelectedImpact(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="Tous">Tous</option>
                        <option value="Faible">Faible</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Élevé">Élevé</option>
                    </select>
                </div>
            </div>

            {/* Liste des résultats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredIrritants.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', padding: '20px' }}>Aucun irritant ne correspond à vos critères.</p>
                ) : (
                    filteredIrritants.map(item => {
                        let statusColor = '#e63946';
                        if (item.statut === 'En cours') statusColor = '#f5a623';
                        if (item.statut === 'Terminé') statusColor = '#2a9d8f';

                        return (
                            <div key={item.id_irritant || item.id} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1d3557' }}>{item.code}</span>
                                    <span style={{ background: statusColor, color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                                        {item.statut}
                                    </span>
                                </div>
                                <p style={{ margin: '5px 0', color: '#333' }}><strong>Description :</strong> {item.description}</p>
                                <p style={{ margin: '5px 0', color: '#555', fontSize: '13px' }}>
                                    <span><strong>Proposé par :</strong> {item.qui || 'Anonyme'} ({item.date})</span>
                                    {' | '}
                                    <span><strong>Impact :</strong> {item.impact}</span>
                                    {' | '}
                                    <span><strong>Traitement :</strong> {item.traitement}</span>
                                </p>
                                {item.solution && (
                                    <p style={{ margin: '5px 0', color: '#2a9d8f', fontSize: '13px' }}><strong>Solution :</strong> {item.solution}</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default IrritantSearch;