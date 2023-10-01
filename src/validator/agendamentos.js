const logger = require('../logger');


const validateNovoAgendamento = (request, response, next) => {
    const { body } = request;

    // validations
    if (!body.descricao) {
        logger.error('validateNovoAgendamento - A descrição é obrigatória!');
        return res.status(422).json({ msg: "A descrição é obrigatória!" });
      }

    next();
}

const validateAtualizarAgendamento = (request, response, next) => {
    const { body } = request;

    // validations
    if (!body.descricao) {
        logger.error('validateAtualizarAgendamento - A descrição é obrigatória!');
        return res.status(422).json({ msg: "A descrição é obrigatória!" });
      }

    next();
}



module.exports = {
    validateNovoAgendamento,
    validateAtualizarAgendamento
};