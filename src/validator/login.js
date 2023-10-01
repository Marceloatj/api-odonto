const logger = require('../logger');


const validateLogin = (request, response, next) => {
    const { body } = request;
    
    logger.info(`Solicitação autenticação de login`);

    // validations
    if (!body.email) {
        logger.error('ValidateRegister - O email é obrigatório!');
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!body.senha) {
        logger.error('ValidateRegister - A senha é obrigatória!');
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    next();
}


module.exports = {
    validateLogin
};