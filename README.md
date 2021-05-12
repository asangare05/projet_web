# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Configuration ###
Projet du projet
1-création du package.json
 >npm init
Repondre au questionnaire

Création de 3 bases de donnée dans XAMP par exemple
Nom de la dase de dev database_development_app_lets_colis
Nom de la dase de dev database_test_app_lets_colis
Nom de la dase de dev database_production_app_lets_colis

### Dependencies ###
Installation de la dependance Express
Pour installer Express
>>npm install express --save  

A cette etape un nouveau dossier node_modules et un fichier package-lock.json

utilise nodemon pour redemarrage automatique de notre application (--save-dev pour spécifier que ce traitement se fera uniquement en dev)
>npm install nodemon --save-dev

Mise à jour du script
  "scripts": {
    "start": "nodemon app.js"
  },


### Installation ###
Installation du Middleware morgan
>npm install morgan --save-dev

Parser nos requette 
>npm install body-parser --save

Installation d'ORM (Object Relation Mapping) sequelize
>npm install sequelize --save

Installation de sequelize en ligne de commande
>npm install -g sequelize-cli

Installation de mysql2
>npm install mysql2 --save

Installer Bcrypt pour crypter les mots de passe
>npm install bcrypt --save

Installer un jeton jwt
>>npm install jsonwebtoken --save

### Commande Sequelize ###
Initialisation de Sequelize dans le projet
>sequelize init

Création des tables (User, Profil)
>sequelize model:create --attributes "email:string username:string password:string isAdmin:boolean" --name User
>sequelize model:create --attributes "isUSERS:integer firstname:string lastname:string gender:boolean street:string number:integer appartment_number:string country_code:integer city:string phone_number:string info:string" --name Profil


### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact