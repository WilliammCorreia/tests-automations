# TodoList App
Une application réalisé en cours de tests et automatisations, avec l'ESGI.

## Lancer l'application
- `cd tests-automations`
- `cat .env.example > .env`
- `docker compose up -d`
- `npm install`
- `npm run dev`
Le serveur *Express.js* est disponible sur `http://localhost:3000` !

## Lancer les tests
- `cd tests-automations`
- `cat .env.example > .env`
- `docker compose up -d`
- `npm install`
- `npm run test`
Les tests sont lancés !

## Tests unitaires
- Utilisation de *jest* pour les tests unitaires.
- Utilisation de *mock* pour ces tests.
- Utilisation d'initialisation avec des *beforeEach*, *afterAll*.

## Tests d'intégrations
- Utilisation de *supertest* via *jest*.
- Réalisé aussi avec *Postman* (non visible sur le repository).

## Intégration Continue
- Réalisation d'un CI avec *Github Actions*.
- Utilisation d'un *workflow* node.js.
- Modification de ce workflow pour intégrer la base de données, nécessaire aux tests unitaires.