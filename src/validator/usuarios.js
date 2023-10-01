const logger = require('../logger');


const validateNovoUsuario = (request, response, next) => {
    const { body } = request;

    // validations
    if (!body.nome) {
        logger.error('validateNovoUsuario - O nome é obrigatório!');
        return res.status(422).json({ msg: "O nome é obrigatório!" });
      }
    if (!body.senha) {
        logger.error('validateNovoUsuario - A senha é obrigatória!');
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    if (!body.email) {
        logger.error('validateNovoUsuario - O email é obrigatório!');
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
      

    next();
}


module.exports = {
    validateNovoUsuario
};