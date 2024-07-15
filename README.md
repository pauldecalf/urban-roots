# UrbanRoots

## Introduction

Bienvenue sur UrbanRoots, une plateforme dédiée au jardinage urbain collaboratif. Notre objectif est de promouvoir des pratiques de jardinage éco-responsables et de créer une communauté engagée et solidaire.

## Fonctionnalités

UrbanRoots propose les fonctionnalités suivantes :

1. **Carte Interactive**
   - Localisation et création d'espaces de jardinage urbain.

2. **Plateforme d'Échanges**
   - Partage de ressources et de conseils entre les membres.

3. **Forums Communautaires**
   - Discussions et organisation d'événements autour du jardinage urbain.

4. **Modules Éducatifs**
   - Contenus éducatifs pour apprendre les bonnes pratiques de jardinage urbain.

5. **Outil de Suivi Environnemental**
   - Mesure des impacts des actions des utilisateurs sur l'environnement.

6. **Recherche et Filtrage**
   - Système de recherche avec filtrage selon divers critères (catégorie, distance, valeur estimée, etc.).

7. **Système d'Évaluation**
   - Évaluation des échanges et des utilisateurs pour garantir la qualité et la fiabilité des interactions.

## Technologies Utilisées

- **Backend**: NestJS
- **Frontend**: NestJS
- **Base de Données**: MongoDB
- **Carte Interactive**: Leaflet
- **Authentification**: Google SignIn
- **Déploiement**: Heroku

## Installation

### Prérequis

- Node.js
- npm ou yarn
- PostgreSQL

### Étapes d'Installation

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/pauldecalf/urban-roots.git
   cd urbanroots
2. **Installez les dépendances**

    ```bash
    npm install
    # ou
    yarn install

### Configurez les variables d'environnement
## Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :
    ```bash
    DATABASE_URL=postgres://user:password@localhost:5432/urbanroots
    GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
    GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret

