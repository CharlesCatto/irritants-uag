import { useState } from 'react';

function IrritantSearch({ irritants }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('tous');
    const [selectedStatut, setSelectedStatut] = useState('Tous');
    const [selectedTraitement, setSelectedTraitement] = useState('Tous');

    // Filtrage dynamique multicritères avec ciblage de champ
    const filteredIrritants = irritants.filter(item => {
        const search = searchTerm.toLowerCase();
        let matchesText = true;

        if (searchTerm.trim() !== '') {
            if (searchField === 'tous') {
                matchesText = 
                    (item.code?.toLowerCase().includes(search)) ||
                    (item.date?.toLowerCase().includes(search)) ||
                    (item.qui?.toLowerCase().includes(search)) ||
                    (item.description?.toLowerCase().includes(search)) ||
                    (item.impact?.toLowerCase().includes(search)) ||
                    (item.traitement?.toLowerCase().includes(search)) ||
                    (item.prise_en_charge?.toLowerCase().includes(search)) ||
                    (item.solution?.toLowerCase().includes(search)) ||
                    (item.statut?.toLowerCase().includes(search));
            } else if (searchField === 'code') {
                matchesText = item.code?.toLowerCase().includes(search);
            } else if (searchField === 'qui') {
                matchesText = item.qui?.toLowerCase().includes(search);
            } else if (searchField === 'description') {
                matchesText = item.description?.toLowerCase().includes(search);
            } else if (searchField === 'traitement') {
                matchesText = item.traitement?.toLowerCase().includes(search);
            }
        }

        const matchesStatut = selectedStatut === 'Tous' || item.statut === selectedStatut;
        const matchesTraitement = selectedTraitement === 'Tous' || item.traitement === selectedTraitement;

        return matchesText && matchesStatut && matchesTraitement;
    });

    return (
        <div style={{ padding: '20px', background: '#fdfdfd', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ color: '#007bff', marginBottom: '20px' }}>🔍 Recherche Avancée et Ciblée</h3>

            {/* Barres de recherche et sélecteurs de filtres */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
                >
                    <option value="tous">🔍 Tous les champs</option>
                    <option value="code">🏷️ Numéro / Code (ex: IRR-)</option>
                    <option value="qui">👤 Nom / Auteur</option>
                    <option value="description">📝 Description / Mots-clés</option>
                    <option value="traitement">⚙️ Traitement</option>
                </select>

                <input
                    type="text"
                    placeholder={
                        searchField === 'code' ? "Filtrer par code (ex: IRR-201)..." :
                        searchField === 'qui' ? "Filtrer par nom (ex: Thomas, Julie)..." :
                        searchField === 'description' ? "Filtrer par mots-clés de description..." :
                        "Recherche globale..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <select
                    value={selectedStatut}
                    onChange={(e) => setSelectedStatut(e.target.value)}
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
                >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Non commencé">Non commencé</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                </select>

                <select
                    value={selectedTraitement}
                    onChange={(e) => setSelectedTraitement(e.target.value)}
                    style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
                >
                    <option value="Tous">Tous les traitements</option>
                    <option value="Quick Win">Quick Win</option>
                    <option value="Gemba Walk">Gemba Walk</option>
                    <option value="Chantier Zone">Chantier Zone</option>
                    <option value="Chantier Kaizen">Chantier Kaizen</option>
                </select>
            </div>

            {/* Tableau complet des résultats */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                        <tr style={{ background: '#007bff', color: '#fff' }}>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Code</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Auteur</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Impact</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Traitement</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Prise en charge</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Solution</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Statut</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Scores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIrritants.length > 0 ? (
                            filteredIrritants.map(item => (
                                <tr key={item.id_irritant || item.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '8px', fontWeight: 'bold' }}>{item.code}</td>
                                    <td style={{ padding: '8px' }}>{item.date}</td>
                                    <td style={{ padding: '8px' }}>{item.qui}</td>
                                    <td style={{ padding: '8px' }}>{item.description}</td>
                                    <td style={{ padding: '8px' }}>{item.impact}</td>
                                    <td style={{ padding: '8px' }}>{item.traitement}</td>
                                    <td style={{ padding: '8px' }}>{item.prise_en_charge || '-'}</td>
                                    <td style={{ padding: '8px' }}>{item.solution || '-'}</td>
                                    <td style={{ padding: '8px' }}>
                                        <span style={{
                                            padding: '3px 6px',
                                            borderRadius: '10px',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            backgroundColor: item.statut === 'Terminé' ? '#2a9d8f' : item.statut === 'En cours' ? '#f5a623' : '#e63946',
                                            color: '#fff'
                                        }}>
                                            {item.statut}
                                        </span>
                                    </td>
                                    <td style={{ padding: '8px' }}>I: {item.score_impact} | F: {item.score_facilite}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                    Aucun irritant ne correspond à vos critères de recherche.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IrritantSearch;