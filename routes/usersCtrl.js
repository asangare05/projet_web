// Import
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

//Constante
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.\d).{4,15}$/;

//Routes

module.exports = {
// Methode registrer pour créer les nouveaux utilisateurs
    register: function(req, res) {
    // On déclare les paramètres necessaire à la création d'un nouvel uitlisateur
        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
    /**
     * Paramère et controle neccessaire à la création d'un nouvel utilisateur
     */
        // On s'assure que le email, le usermane et le password ne sont pas vide
        if(email == null || username == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        // La taille du username doit etre comprise en 4 et 15        
        if(username.length >= 15 || username.length <= 4){
            return res.status(400).json({'error': 'Wrong username (must be length 5 - 15)'});
        }

        // A partir d'une regex on vérifie si le mail saisi correspond à un email
        if(!EMAIL_REGEX.test(email)){
             return res.status(400).json({'error':'Email is not valid'});
        }

        // Utilisation du regex pour le message passe se dernier doit être commris en 4 et 8 et doit contenir un chiffre        
        if(!PASSWORD_REGEX.test(password)){
            return res.status(400).json({'error':'password invalid (must length 4 - 8 and include 1 number at'});
        }

     /**
     * Utilisation de la methode findOne avec l'email pour vérifier si l'utilisateur existe deja en base de donnée
     * Le THEN nous sert à créer l'utilisateur si ce dernier n'est pas présent en base
     * Le CATCH quant à lui servira à intercepter l'erreur si la requete n'as pas aboutie
     */
      models.User.findOne({
        attributes: ['email'],
        where: {email: email}
    })        
    .then(function(userFound){
           
        if(!userFound){
        /**
        * On va créer un nouvel utilisateur tout en cryptant son mot de passe 
        * La valeur 5 correspond au niveau de cryptage du mot de passe
        */
           bcrypt.hash(password, 5, function(err, bcryptedPassword) {
               var newUser = models.User.create({
                  // On cree le nouvelle utilisateur 
                 email: email,
                 username: username,
                 password: bcryptedPassword,
                 isAdmin: 0    // Par defaut l'utilisateur ne sera pas Admin de l'application
               })
               .then(function(newUser){
                 // On retourne un code 201 avec l'ID de l'utilisateur crée  
                   return res.status(201).json({
                       'userId': newUser.id
                   })
               })  
               .catch(function(err){
                   return res.status(500).json({'error': 'cannot add user'});
               }) 
           });
           
        }else{
            return res.status(409).json({'error': 'user already exist'});
        }   
       })
       .catch(function(err){
           return res.status(500).json({'error': 'unable to verify user'});
       });
    },

// Methode s'identifier     
    login: function(req, res){
      // On récupère les paramètre envoyés
      var email = req.body.email;
      var password = req.body.password;
      // On vérifie que l'email et le mot de passe sont renseignés
      if(email == null || password == null){
          return res.status(400).json({'error': 'missiong parameters'});
      }
      // On vérifie que l'email de l'utilisateur existe bien dans la base de donnée avec la methode findDone
      models.User.findOne({
        where: {email: email}
    })
    .then(function(userFound){
        if(userFound){
    /**
     * On va récuperer le mot de passe saisi par l'utilisateur 
     * et on va le crypter et faire une comparaison avec celui qui ait stocké dans la base de donnée
     *
     * @param   {[type]}  password    [password description]
     * @param   {[type]}  userFound   [userFound description]
     * @param   {[type]}  function    [function description]
     * @param   {[type]}  errBycrypt  [errBycrypt description]
     * @param   {[type]}  resBycrypt  [resBycrypt description]
     *
     * @return  {[type]}              [return description]
     */
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
            if(resBycrypt){
                return res.status(200).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            }else{
                return res.status(403).json({'error': 'invalid password'});
            }
         })
        }else{
            return res.status(404).json({'error': 'user not exist in DB'});
        }
    })
    .catch(function(err){
        return res.status(500).json({'error':'unable to verify user'});
    })
    },

  
}