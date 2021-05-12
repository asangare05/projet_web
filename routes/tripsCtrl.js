//Import
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Constante
const TITLE_LIMIT = 2;
const CITY_LIMIT = 2;

module.exports = {
    
    // Methode registrer pour créer les messages    
    createTrip: function( req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        
        //Params
        var departure_city = req.body.departure_city;
        var departure_date = req.body.departure_date;
        var arrival_city   = req.body.arrival_city;
        var arrival_date   = req.body.arrival_date;
        var transport_type = req.body.transport_type;
        var price          = req.body.price;

       // if(departure_city.length >= CITY_LIMIT || )

       models.User.findOne({
        where: { id: userId }
    })   
    .then(function(userFound){
        if(userFound){
            models.trips.create({
                departure_city: departure_city,
                departure_date: departure_date,
                arrival_city: arrival_city,
                arrival_date: arrival_date,
                transport_type: transport_type,
                price: price,
                UserId:  userFound.id
            })
            .then(function(newTrip){
                res.status(201).json(newTrip);
            })
            .catch(function(err){
                res.status(500).json({'error': `profil: ${err}`});
            })
        }else{
            res.status(404).json({'error':'user not found'});
        }
    }).catch(function(err){
        res.status(500).json({'error': `${err}`});
    });
    },
    listTrips: function(req, res){
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        models.trips.findAll({
            order:[(order != null) ? order.split(':') : ['departure_city', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ] 
            }]
        })
        .then(function(trips){
            if(trips){
                res.status(200).json(trips);
            }else{
                res.status(404).json({'error': 'no messages found'});
            }
        }).catch(function(err){
            console.log(err);
            res.status(500).json({'error':`${err}`});
        })
    }
}  