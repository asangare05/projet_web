// IMPORT
var jwt = require('jsonwebtoken');

// Constante
// Clé pour décrypter le jwt (Json Web Token)
const JWT_SIGN_SECRET = 'Lq/yb(Mkz!keUx;2s9\7a$`{ALB`3P5VN[2+G>6.W^yt';

// Export
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET, 
        {
    // Temps d'expiration du token
            expiresIn: '1h'
        })
    },
    /**
     *  On va juste vérifier si la chaine de caractère autorisation est non null,
     *  si c'est le cas on va retirer l'instruction BEARER pour recupérer uniquement le token
     */

    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    /**
     * Cette fonction servira a récuperer le userid
     * on va definir un userid à -1 car nous ne souhaite pas faire de requete vers quelque chose qui n'existe pas
     * On vérifie que le token recupérer est toujours valide pour cela on va le vérifier avec notre clé secrete
     */
    getUserId: function(authorization){
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    userId = jwtToken.userId;
                    return userId;
            } catch (err) {
                return res.status(400).json({'error': 'wrong token'});
            }
        }
    }
    
}