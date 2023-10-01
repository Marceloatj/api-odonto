const logger = require('../logger');
const jwt = require('jsonwebtoken');

const verifyJWT = (request, response, next) => {

    // validations
    const token = request.headers['x-acess-token'];
    if (!token){
        logger.error(`Token não enviada.`);
        return res.status(401).json({ auth: false, message: 'Token não enviada.' });
    } 
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err){
        logger.error(`Falha na autenticação do token.`);
        return res.status(500).json({ auth: false, message: 'Falha na autenticação do token.' });
      } 
      
      // se tudo estiver ok, salva no request para uso posterior
      request.userId = decoded.id;
      next();
    });
}


module.exports = {
    verifyJWT
};