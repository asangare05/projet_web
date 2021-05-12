//Import
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

//Routes

module.exports = {
// Methode registrer pour créer le profils d'un nouvel utilisateur    
    createProfil: function( req, res){
        // On déclare les paramètres nécessaire à la création d'un nouveau profil uitlisateur
        //Params
        var isUSERS = req.body.isUSERS;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var gender = req.body.gender;
        var street = req.body.street;
        var number = req.body.number;
        var appartment_number = req.body.appartment_number;
        var country_code = req.body.country_code;
        var city = req.body.city;
        var phone_number = req.body.phone_number;
        var info = req.body.info;

    /**
     * Utilisation de la methode findOne avec l'id de l'utilisateur pour vérifier si ce dernier existe deja en base de donnée
     * Le THEN nous sert à créer l'utilisateur si ce dernier n'est pas présent en base
     * Le CATCH quant à lui servira à intercepter l'erreur si la requete n'as pas aboutie
     *
     * **/
        models.Profil.findOne({
            attributes: ['isUSERS'],
            where: {isUSERS: isUSERS}
        })   
        .then(function(profilFound){
            if(!profilFound){
                var newProfil = models.Profil.create({
                    // On cree le nouveau profil 
                    isUSERS: isUSERS,
                    firstname: firstname,
                    lastname: lastname,
                    gender: gender,
                    street: street,
                    number: number,
                    appartment_number: appartment_number,
                    country_code: country_code,
                    city: city,
                    phone_number: phone_number,
                    info: info
                })
                .then(function(newProfil){
                    return res.status(201).json({
                        'isUSERS': newProfil.id
                    })
                })  
                .catch(function(err){
                    return res.status(500).json({'error': 'cannot add Profil'});
                }) 
    
             }else{
                 return res.status(409).json({'error': 'Profil already exist'});
             } 
        }).catch(function(err){
            return res.status(500).json({'error': 'cannot find Profil'})
        });
    },

    /**
 * Cette fonction servira à récupérer notre profil mais également à le modifier
 * Récupérer l'entete autorisation de notre requete
 * Récupérer l'identifiant et le token
 */
     getUserProfile: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
       // return res.status(200).json({'token': `my ${userId} token`});
        
        if(userId < 0){
            return res.status(400).json({'error': 'wrong token'});
        }
        
/**
 * A partir de l'ORM on va récuperer les champs qui seront successitible d'etre modifié
 * Pour cela on va utiliser le userid précisé dans le token dans la condition WHERE
 */
        models.Profil.findOne({
            attributes: ['isUSERS', 'firstname', 'lastname', 'gender','street', 'number', 'appartment_number', 'country_code', 'city', 'phone_number', 'info'],
            where: { isUSERS: userId }
        })   
        .then(function(profil){
            if(profil){
                res.status(201).json(profil);
            }else{
                res.status(404).json({'error':'profil not found'});
            }
        }).catch(function(err){
            res.status(500).json({'error': 'cannot fetch profil'});
        });
    },
    
/**
 * Modification du profil
 */    
    updateUserProfile: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        // Paramètre disponible à la modification du profil
        var isUSERS = req.body.isUSERS;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var gender = req.body.gender;
        var street = req.body.street;
        var number = req.body.number;
        var appartment_number = req.body.appartment_number;
        var country_code = req.body.country_code;
        var city = req.body.city;
        var phone_number = req.body.phone_number;
        var info = req.body.info;

        models.Profil.findOne({
            attributes: ['id', 'isUSERS', 'firstname', 'lastname', 'gender','street', 'number', 'appartment_number', 'country_code', 'city', 'phone_number', 'info'],
            where: { isUSERS: userId }
        })
        .then(function(profilFound){
            if(profilFound){
                profilFound.update({
                    firstname: (firstname ? firstname : profilFound.firstname),
                    lastname: (lastname ? lastname : profilFound.lastname),
                    gender: (gender ? gender : profilFound.gender),
                    street: (street ? street : profilFound.street),
                    number: (number ? number : profilFound.number),
                    appartment_number: (appartment_number ? appartment_number : profilFound.appartment_number),
                    country_code: (country_code ? country_code : profilFound.country_code),
                    city: (city ? city : profilFound.city),
                    phone_number: (phone_number ? phone_number : profilFound.phone_number),
                    info: (info ? info : info.info)
                }).
                then(function(profilFound){
                    res.status(201).json(profilFound);
                })
                .catch(function(err){
                    res.status(500).json({'error': `profil: ${err}`});
                })
            }else{
                res.status(404).json({'error':'profil not found'});
            }
        }).catch(function(err){
            res.status(500).json({'error': `${err}`});
        });  
    }
}