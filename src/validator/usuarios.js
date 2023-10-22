const logger = require('../logger');


const validateNovoUsuario = (request, response, next) => {
    const { body } = request;

    // validations
    if (!body.NOME) {
        logger.error('validateNovoUsuario - O nome é obrigatório!');
        return res.status(422).json({ msg: "O nome é obrigatório!" });
      }
    if (!body.EMAIL) {
        logger.error('validateNovoUsuario - O email é obrigatório!');
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!body.SENHA) {
        logger.error('validateNovoUsuario - A senha é obrigatória!');
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    next();
}

const validateUsuarioByID = (request, response, next) => {
    const { body } = request;

    // validations
    if (!body.IDUSUARIO) {
        logger.error('validateAtualizaUsuario - O ID obrigatório!');
        return res.status(422).json({ msg: "O ID obrigatório!" });
      }

    next();
}




module.exports = {
    validateNovoUsuario,
    validateUsuarioByID
};