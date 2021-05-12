// Import les dépendances
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

// Constante
const port = process.env.PORT || 8080;
var server = express();

/**
 * Body Parser Configuration
 * Permet de recupérer les paramètres de l'URL
 */
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
// La route globale
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour mon server NodeJS 2 </h1>');
  });

server.use('/api/', apiRouter);  
// Serveur en écoute
server.listen(port, ()=> {
    console.log('server en écoute');
});  