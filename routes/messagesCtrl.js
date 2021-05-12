//Import
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Constante
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

module.exports = {
    
// Methode registrer pour créer les messages    
createMessage: function( req, res){
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    // On déclare les paramètres nécessaire à la création d'un nouveau message
    //Params
    var subject = req.body.subject;
    var content = req.body.content;
    var attachment = req.body.attachment;
    var time = new Date().getTime();

    if(title == null || message == null){
        return res.status(400).json({'error':'missing parameters'});
    }

    if(title.length <= TITLE_LIMIT || content.length <= 4){
        return res.status(400).json({'error':'invalid parameters'});
    }
    
// On va recuperer notre utilisateur dans la base de donnée
    models.User.findOne({
        where: { id: userId }
    })   
    .then(function(userFound){
        if(userFound){
            models.Message.create({
               subject: subject,
               content: content,
               time: time,
               isUSERS:  userFound.id
            })
            .then(function(newMessage){
                res.status(201).json(newMessage);
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

}