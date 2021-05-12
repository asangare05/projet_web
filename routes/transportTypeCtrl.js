//Import
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');


module.exports = {
    // Methode registrer pour créer un nouveau type de transport
    createTransportType: function(req, res) {
    // On déclare les paramètres necessaire à la création d'un nouvel uitlisateur
    // Params
        var description = req.body.description;

        models.transporttype.findOne({
            attributes: ['description'],
            where: {description: description}
        })     
        .then(function(transporttypeFound){
            if(!transporttypeFound){
                var newTransporttype = models.transporttype.create({
                    // On cree un nouveau type de transport 
                    description: description
                 })
                 .then(function(newTransporttype){
                   // On retourne un code 201 avec l'ID du type de transport crée  
                     return res.status(201).json({
                         'userId': newTransporttype.id
                     })
                 })  
                 .catch(function(err){
                     return res.status(500).json({'error': 'cannot add Transport Type'});
                 }) 
            }else{
                return res.status(409).json({'error': 'Transport Type already exist'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': `${err}`});
        });
    },
    listTransportType: function(req, res){
        var order = req.query.order;

        models.transporttype.findAll({
            order:[['description', 'ASC']],
            attributes: ['id', 'description']
        })
        .then(function(transporttype){
            if(transporttype){
                res.status(200).json(transporttype);
            }else{
                res.status(404).json({'error': 'no transport type found'});
            }
        }).catch(function(err){
            console.log(err);
            res.status(500).json({'error':`${err}`});
        })
    }

}