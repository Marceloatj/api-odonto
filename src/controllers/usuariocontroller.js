const usuaRepo = require('../repositorio/usuariorepositorio');
const logger = require('../logger');

  // novo mysql

  const getAllUsuarios = async (request, response) =>{
    logger.info('Requisição GET recebida');

    const usu = await usuaRepo.buscarUsuarios();

    return response.status(200).json(usu);
};

const createUsuario = async (request, response) => {
  logger.info('Requisição POST recebida');

  const createdUsuario = await usuaRepo.novoUsuario(request.body);

  return response.status(201).json(createdUsuario);
};

const deleteUsuario = async (request, response) => {
  logger.info('Requisição DELETE recebida');

  const { id } = request.params;

  await usuaRepo.deletarUsuario(id);

  return response.status(204).json();
};

const updateUsuario = async (request, response) => {
  logger.info('Requisição PUT recebida');

  const { id } = request.params;

  await usuaRepo.atualizarUsuario(id, request.body);

  return response.status(204).json();
};



module.exports = {
    //novo mysql
    getAllUsuarios,
    createUsuario,
    deleteUsuario,
    updateUsuario
};