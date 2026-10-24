import { useState } from 'react';
import html2pdf from 'html2pdf.js';

function IrritantForm({ setActiveTab }) {
    // Initialisation paresseuse : exécutée une seule fois au montage
    const [formData, setFormData] = useState(() => ({
        code: `IRR-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        qui: '',
        description: '',
        impact: 'Faible',
        traitement: 'Quick Win',
        priseEnCharge: '',
        solution: '',
        statut: 'Non commencé',
        x: 5,
        y: 5
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.description.trim()) {
            alert("Veuillez renseigner au moins la description de l'irritant.");
            return;
        }

       const payload = {
            code: formData.code,
            date: formData.date,
            qui: formData.qui,
            description: formData.description,
            impact: formData.impact,
            traitement: formData.traitement,
            prise_en_charge: formData.priseEnCharge,
            solution: formData.solution,
            statut: formData.statut,
            score_impact: formData.y,
            score_facilite: formData.x,
            id_utilisateur: 1
        };

        fetch('http://localhost:5000/api/irritants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert("Fiche enregistrée sur le serveur avec succès !");
                setActiveTab('graph');
            } else {
                alert("Erreur lors de l'enregistrement sur le serveur.");
            }
        })
        .catch(error => console.error("Erreur réseau :", error));
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('fiche-uag-container');
        if (!element) {
            alert("Impossible de trouver la fiche à exporter.");
            return;
        }

        const opt = {
            margin: 10,
            filename: `Fiche_${formData.code}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>

            <div id="fiche-uag-container" style={{ background: '#fff', border: '2px solid #2b2b2b', paddingBottom: '10px' }}>

                <div style={{ display: 'flex', borderBottom: '2px solid #2b2b2b', background: '#c1d7ae' }}>
                    <div style={{ flex: 2, padding: '15px', borderRight: '2px solid #2b2b2b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '20px', textTransform: 'uppercase', textAlign: 'center', color: '#1d3557' }}>
                            Fiche de suivi des irritants UAG
                        </h2>
                    </div>
                    <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Code irritant :</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1d3557' }}>{formData.code}</span>
                    </div>
                </div>

                <div style={{ padding: '20px' }}>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="input-date" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Date :</label>
                            <input id="input-date" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="input-qui" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Qui ?</label>
                            <input id="input-qui" type="text" placeholder="Votre nom" value={formData.qui} onChange={e => setFormData({ ...formData, qui: e.target.value })} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="textarea-desc" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description de l'irritant :</label>
                        <textarea id="textarea-desc" rows="3" placeholder="Décrivez le problème constaté..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical' }} />
                    </div>

                    <div style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Mesure de l'impact sur l'activité</div>
                        <div style={{ display: 'flex', padding: '10px', gap: '20px' }}>
                            {['Faible', 'Moyen', 'Élevé'].map(level => (
                                <label key={level} htmlFor={`impact-${level}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input id={`impact-${level}`} type="radio" name="impact" checked={formData.impact === level} onChange={() => setFormData({ ...formData, impact: level })} />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Comment traiter le sujet ?</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px', gap: '10px' }}>
                            {['Quick Win', 'Gemba Walk', 'Chantier Zone', 'Chantier Kaizen'].map(type => (
                                <label key={type} htmlFor={`traitement-${type.replace(/\s+/g, '-')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input id={`traitement-${type.replace(/\s+/g, '-')}`} type="radio" name="traitement" checked={formData.traitement === type} onChange={() => setFormData({ ...formData, traitement: type })} />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="input-charge" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Sujet pris en charge par : <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#666' }}>(Magasinier / CAP / Manager / RUA)</span></label>
                        <input id="input-charge" type="text" placeholder="Ex. : RUA / Manager" value={formData.priseEnCharge} onChange={e => setFormData({ ...formData, priseEnCharge: e.target.value })} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="textarea-sol" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Solution envisagée :</label>
                        <textarea id="textarea-sol" rows="2" placeholder="Quelle solution proposez-vous ?" value={formData.solution} onChange={e => setFormData({ ...formData, solution: e.target.value })} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', resize: 'vertical' }} />
                    </div>

                    <div style={{ marginBottom: '20px', padding: '15px', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '4px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#856404' }}>📈 Positionnement dans la matrice (notes sur 10)</div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="range-x" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Facilité de mise en place (axe X) : {formData.x}/10</label>
                                <input id="range-x" type="range" min="0" max="10" step="0.5" value={formData.x} onChange={e => setFormData({ ...formData, x: Number.parseFloat(e.target.value) })} style={{ width: '100%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="range-y" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Impact sur le travail (axe Y) : {formData.y}/10</label>
                                <input id="range-y" type="range" min="0" max="10" step="0.5" value={formData.y} onChange={e => setFormData({ ...formData, y: Number.parseFloat(e.target.value) })} style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#e3f2fd', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Statut actuel</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fafafa' }}>
                            {['Non commencé', 'En cours', 'Terminé'].map(statusName => (
                                <label key={statusName} htmlFor={`status-${statusName.replace(/\s+/g, '-')}`} style={{ fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input id={`status-${statusName.replace(/\s+/g, '-')}`} type="radio" name="statut" checked={formData.statut === statusName} onChange={() => setFormData({ ...formData, statut: statusName })} />
                                    {statusName}
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Boutons d'action, exclus du PDF */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={handleDownloadPDF} style={{ width: '100%', padding: '12px', background: '#4a4a4a', color: '#fff', fontSize: '15px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    🖨️ Télécharger la fiche au format PDF
                </button>

                <button type="button" onClick={handleSubmit} style={{ width: '100%', padding: '14px', background: '#2a9d8f', color: '#fff', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    💾 Enregistrer la fiche et l'ajouter au tableau
                </button>
            </div>
        </div>
    );
}

export default IrritantForm;