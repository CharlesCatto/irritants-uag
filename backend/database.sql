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

-- Insertion des 5 humains (Collaborateur, Préparateur, Manager, CAP, RUA)
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

-- Insertion des 5 irritants avec descriptions Lorem Ipsum
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
SELECT 'IRR-201', '2026-06-01', 'Thomas (Collaborateur)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Faible', 'Quick Win', 'Collaborateur', 'Ajuster la procédure locale.', 'Non commencé', 3, 8, 1
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
SELECT 'IRR-202', '2026-06-02', 'Lucas (Préparateur)', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Moyen', 'Gemba Walk', 'Préparateur', 'Vérifier l accessibilité du poste.', 'En cours', 6, 6, 2
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
SELECT 'IRR-203', '2026-06-03', 'Sarah (Manager)', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', 'Élevé', 'Chantier Zone', 'Manager', 'Réorganiser entièrement la zone de stockage.', 'Non commencé', 9, 3, 3
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
SELECT 'IRR-204', '2026-06-04', 'Mehdi (CAP)', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.', 'Moyen', 'Quick Win', 'CAP', 'Mettre en place un affichage visuel standardisé.', 'Terminé', 5, 9, 4
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
SELECT 'IRR-205', '2026-06-05', 'Julie (RUA)', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.', 'Élevé', 'Chantier Kaizen', 'RUA', 'Lancer un atelier d amélioration continue global.', 'En cours', 8, 5, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM irritants
        WHERE
            code = 'IRR-205'
    );