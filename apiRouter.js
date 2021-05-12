//Import
var express = require('express');
var userCtrl = require('./routes/usersCtrl');
var profilCtrl = require('./routes/profilCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
var tripsCtrl = require('./routes/tripsCtrl');
var transportTypeCtrl = require('./routes/transportTypeCtrl');

//Router
exports.router = (function(){
    // On crée une instance de l'objet Route
    var apiRouter = express.Router();

    //Route pour créer un nouvel utilisateur
    apiRouter.route('/users/register/').post(userCtrl.register);
    // Route pour se connecter 
    apiRouter.route('/users/login/').post(userCtrl.login);
    // Route pour la création du profil
    apiRouter.route('/users/profil/').post(profilCtrl.createProfil);
    // Route pour la récupérer le profil
    apiRouter.route('/users/profil/').get(profilCtrl.getUserProfile);
    // Route pour la modifcation le profil
    apiRouter.route('/users/profil/').put(profilCtrl.updateUserProfile);

   // Route pour la createion d'un message
    apiRouter.route('/users/message/new').post(messagesCtrl.createMessage);

    // Route pour la createion d'un trip
    apiRouter.route('/users/trip/new').post(tripsCtrl.createTrip);
    // Route pour la createion d'un trip
    apiRouter.route('/users/trips/').get(tripsCtrl.listTrips);

    // Route pour la createion d'un type de transport
    apiRouter.route('/transporttype/new').post(transportTypeCtrl.createTransportType);
    // Route pour liste des types de transports
    apiRouter.route('/transporttype/').get(transportTypeCtrl.listTransportType);

    return apiRouter;
})();