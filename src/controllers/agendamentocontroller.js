const agenRepo = require('../repositorio/agendamentorepositorio');
const logger = require('../logger');


  // novo mysql

  const getAllAgendamentos = async (request, response) =>{
    logger.info('Requisição GET recebida');

    const agen = await agenRepo.buscarAgendamentos();

    return response.status(200).json(agen);
};

const createAgendamento = async (request, response) => {
  logger.info('Requisição POST recebida');

  const createdAgen = await agenRepo.novoAgendamento(request.body);

  return response.status(201).json(createdAgen);
};

const deleteAgendamento = async (request, response) => {
  logger.info('Requisição DELETE recebida');

  const { id } = request.params;

  await agenRepo.deletarAgendamento(id);

  return response.status(204).json();
};

const updateAgendamento = async (request, response) => {
  logger.info('Requisição PUT recebida');

  const { id } = request.params;

  await agenRepo.atualizarAgendamento(id, request.body);

  return response.status(204).json();
};



module.exports = {
    //novo mysql
    getAllAgendamentos,
    createAgendamento,
    deleteAgendamento,
    updateAgendamento
};