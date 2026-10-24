-- Création des tables de base
CREATE TABLE IF NOT EXISTS unities (
    id_ua INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_ua TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS utilisateurs (
    id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    role TEXT NOT NULL,
    id_ua INTEGER,
    FOREIGN KEY (id_ua) REFERENCES unities (id_ua)
);

CREATE TABLE IF NOT EXISTS irritants (
    id_irritant INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    date TEXT,
    qui TEXT,
    description TEXT,
    impact TEXT,
    traitement TEXT,
    prise_en_charge TEXT,
    solution TEXT,
    statut TEXT,
    score_impact REAL,
    score_facilite REAL,
    id_utilisateur INTEGER,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs (id_utilisateur)
);

-- Insertion des 3 Unités Autonomes
INSERT INTO
    unities (id_ua, nom_ua)
SELECT 1, 'UA Gauche'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM unities
        WHERE
            id_ua = 1
    );

INSERT INTO
    unities (id_ua, nom_ua)
SELECT 2, 'UA Centrale'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM unities
        WHERE
            id_ua = 2
    );

INSERT INTO
    unities (id_ua, nom_ua)
SELECT 3, 'UA Droite'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM unities
        WHERE
            id_ua = 3
    );

-- Insertion des 10 utilisateurs
INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 1, 'Thomas', 'Collaborateur', 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 1
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 2, 'Lucas', 'Préparateur', 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 2
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 3, 'Sarah', 'Manager', 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 3
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 4, 'Mehdi', 'CAP', 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 4
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 5, 'Julie', 'RUA', 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 5
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 6, 'Chloé', 'Collaborateur', 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 6
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 7, 'Marc', 'Préparateur', 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 7
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 8, 'Élodie', 'Manager', 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 8
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 9, 'Karim', 'CAP', 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 9
    );

INSERT INTO
    utilisateurs (
        id_utilisateur,
        nom,
        role,
        id_ua
    )
SELECT 10, 'Sophie', 'RUA', 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM utilisateurs
        WHERE
            id_utilisateur = 10
    );

-- Insertion des 30 irritants
INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-201', '2026-06-01', 'Thomas (Collaborateur)', 'Ajustement difficile du poste de travail sur ligne 1.', 'Faible', 'Quick Win', 'Collaborateur', 'Ajuster la procédure locale.', 'Non commencé', 3, 8, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-201'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-202', '2026-06-02', 'Lucas (Préparateur)', 'Rupture récurrente de bacs de stockage en UA Gauche.', 'Moyen', 'Gemba Walk', 'Préparateur', 'Vérifier l accessibilité du poste.', 'En cours', 6, 6, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-202'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-203', '2026-06-03', 'Sarah (Manager)', 'Erreur de saisie systématique sur l outil ERP.', 'Élevé', 'Chantier Zone', 'Manager', 'Réorganiser entièrement la zone de stockage.', 'Non commencé', 9, 3, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-203'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-204', '2026-06-04', 'Mehdi (CAP)', 'Manque d affichage visuel sur le poste d assemblage.', 'Moyen', 'Quick Win', 'CAP', 'Mettre en place un affichage visuel standardisé.', 'Terminé', 5, 9, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-204'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-205', '2026-06-05', 'Julie (RUA)', 'Bruit excessif au niveau du convoyeur central.', 'Élevé', 'Chantier Kaizen', 'RUA', 'Lancer un atelier d amélioration continue global.', 'En cours', 8, 5, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-205'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-206', '2026-06-06', 'Chloé (Collaborateur)', 'Éclairage insuffisant dans la zone de contrôle qualité.', 'Faible', 'Quick Win', 'Collaborateur', 'Remplacer les néons défectueux.', 'Terminé', 2, 9, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-206'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-207', '2026-06-07', 'Marc (Préparateur)', 'Outillage usé non remplacé à temps.', 'Moyen', 'Gemba Walk', 'Préparateur', 'Mettre en place une rotation hebdomadaire des outils.', 'En cours', 5, 7, 7
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-207'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-208', '2026-06-08', 'Élodie (Manager)', 'Délai de validation trop long pour les pièces hors cote.', 'Élevé', 'Chantier Kaizen', 'Manager', 'Créer une grille de décision rapide.', 'Non commencé', 8, 2, 8
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-208'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-209', '2026-06-09', 'Karim (CAP)', 'Absence de marquage au sol pour les chariots.', 'Faible', 'Quick Win', 'CAP', 'Tracer les lignes au sol en UA Centrale.', 'Terminé', 3, 10, 9
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-209'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-210', '2026-06-10', 'Sophie (RUA)', 'Engorgement récurrent lors des changements d équipe.', 'Élevé', 'Chantier Zone', 'RUA', 'Décaler les horaires de transmission de 10 min.', 'En cours', 9, 4, 10
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-210'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-211', '2026-06-11', 'Thomas (Collaborateur)', 'Flaconnage mal étiqueté en réception.', 'Moyen', 'Quick Win', 'Collaborateur', 'Fournir une douchette optique à l entrée.', 'Non commencé', 4, 8, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-211'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-212', '2026-06-12', 'Lucas (Préparateur)', 'Manque de bacs de tri sélectif près du poste 4.', 'Faible', 'Quick Win', 'Préparateur', 'Commander 2 bacs supplémentaires.', 'Terminé', 2, 10, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-212'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-213', '2026-06-13', 'Sarah (Manager)', 'Infiltration d air froid sous la porte de secours.', 'Moyen', 'Gemba Walk', 'Manager', 'Installer un joint d étanchéité.', 'En cours', 6, 5, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-213'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-214', '2026-06-14', 'Mehdi (CAP)', 'Procédure de sécurité peu claire pour la maintenance.', 'Élevé', 'Chantier Zone', 'CAP', 'Rédiger une fiche reflexe visuelle.', 'Non commencé', 8, 4, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-214'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-215', '2026-06-15', 'Julie (RUA)', 'Problème de synchronisation de la base de données.', 'Élevé', 'Chantier Kaizen', 'RUA', 'Migrer vers un serveur dédié optimisé.', 'Terminé', 10, 3, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-215'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-216', '2026-06-16', 'Chloé (Collaborateur)', 'Écran de contrôle trop petit pour lire les séries.', 'Moyen', 'Quick Win', 'Collaborateur', 'Installer un moniteur 24 pouces.', 'En cours', 5, 8, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-216'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-217', '2026-06-17', 'Marc (Préparateur)', 'Attente trop longue au magasin de pièces détachées.', 'Élevé', 'Gemba Walk', 'Préparateur', 'Mettre en place un guichet rapide.', 'Non commencé', 7, 5, 7
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-217'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-218', '2026-06-18', 'Élodie (Manager)', 'Documents papier éparpillés sur les tables de pause.', 'Faible', 'Quick Win', 'Manager', 'Ajouter des porte-documents muraux.', 'Terminé', 1, 9, 8
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-218'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-219', '2026-06-19', 'Karim (CAP)', 'Manque de sièges ergonomiques pour la saisie.', 'Moyen', 'Chantier Zone', 'CAP', 'Tester 3 modèles de sièges réglables.', 'En cours', 6, 6, 9
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-219'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-220', '2026-06-20', 'Sophie (RUA)', 'Perturbations sonores dues aux imprimantes étiquettes.', 'Faible', 'Gemba Walk', 'RUA', 'Ajouter un caisson insonorisant.', 'Non commencé', 3, 7, 10
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-220'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-221', '2026-06-21', 'Thomas (Collaborateur)', 'Desserte trop distante de la ligne de conditionnement.', 'Moyen', 'Quick Win', 'Collaborateur', 'Rapprocher la desserte de 2 mètres.', 'Terminé', 4, 9, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-221'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-222', '2026-06-22', 'Lucas (Préparateur)', 'Niveau d huile difficile à lire sur la presse 2.', 'Faible', 'Quick Win', 'Préparateur', 'Nettoyer le voyant et ajouter une jauge claire.', 'Terminé', 2, 8, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-222'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-223', '2026-06-23', 'Sarah (Manager)', 'Formation incomplète des nouveaux arrivants sur l outil.', 'Élevé', 'Chantier Kaizen', 'Manager', 'Créer un module d onboarding standardisé.', 'En cours', 9, 3, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-223'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-224', '2026-06-24', 'Mehdi (CAP)', 'Pistolets de scannage souvent déchargés le matin.', 'Moyen', 'Quick Win', 'CAP', 'Imposer la remise en charge systématique le soir.', 'Terminé', 5, 10, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-224'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-225', '2026-06-25', 'Julie (RUA)', 'Problème de climatisation en zone de pesée.', 'Élevé', 'Chantier Zone', 'RUA', 'Faire intervenir la maintenance technique.', 'Non commencé', 8, 2, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-225'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-226', '2026-06-26', 'Chloé (Collaborateur)', 'Manque de stylos et marqueurs fonctionnels.', 'Faible', 'Quick Win', 'Collaborateur', 'Réapprovisionner le stock de fournitures.', 'Terminé', 1, 10, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-226'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-227', '2026-06-27', 'Marc (Préparateur)', 'Temps d attente prolongé au niveau du monte-charge.', 'Moyen', 'Gemba Walk', 'Préparateur', 'Ajuster les priorités de descente du matériel.', 'En cours', 6, 5, 7
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-227'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-228', '2026-06-28', 'Élodie (Manager)', 'Retard de saisie des fiches d incident quotidiennes.', 'Élevé', 'Chantier Kaizen', 'Manager', 'Digitaliser le formulaire sur tablette tactile.', 'Non commencé', 7, 4, 8
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-228'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-229', '2026-06-29', 'Karim (CAP)', 'Manque d espace pour déposer les colis terminés.', 'Moyen', 'Chantier Zone', 'CAP', 'Agrandir la zone d attente expédition.', 'En cours', 7, 6, 9
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-229'
    );

INSERT INTO
    irritants (
        code,
        date,
        qui,
        description,
        impact,
        traitement,
        prise_en_charge,
        solution,
        statut,
        score_impact,
        score_facilite,
        id_utilisateur
    )
SELECT 'IRR-230', '2026-06-30', 'Sophie (RUA)', 'Absence de signalisation lors des opérations de nettoyage.', 'Faible', 'Quick Win', 'RUA', 'Mettre à disposition des chevalets de chantier.', 'Terminé', 2, 9, 10
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-230'
    );