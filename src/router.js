const express = require('express');
const logger = require('./logger');
const router = express.Router();


// novo mysql

const loginController = require('./controllers/logincontroller');
const validacaoLogin = require('./validator/login');
const validacaoJWT = require('./validator/verificaJWT');

const usuariosController = require('./controllers/usuariocontroller');
const validacaoUsuarios = require('./validator/usuarios');

const agendamentoController = require('./controllers/agendamentocontroller');
const validacaoAgendamentos = require('./validator/agendamentos');

router.post('/login', validacaoLogin.validateLogin, loginController.autenticacaoLogin);

/*router.post('/logout', validacaoLogin.validateLogin , loginController.realizarlogout);*/
 
router.get('/usuario', /*validacaoJWT.verifyJWT,*/ usuariosController.getAllUsuarios);
router.post('/usuario', validacaoUsuarios.validateNovoUsuario,/*validacaoJWT.verifyJWT,*/ usuariosController.createUsuario);
router.delete('/remove.usuario', validacaoUsuarios.validateUsuarioByID, /*validacaoJWT.verifyJWT,*/ usuariosController.deleteUsuario);
router.put('/atualiza.usuario', validacaoUsuarios.validateUsuarioByID, /*validacaoJWT.verifyJWT,*/ usuariosController.updateUsuario);

/*
router.get('/agendamentos', agendamentoController.getAllAgendamentos);
router.post('/agendamentos', validacaoJWT.verifyJWT, validacaoAgendamentos.validateNovoAgendamento, agendamentoController.createAgendamento);
router.delete('/agendamentos/:id', validacaoJWT.verifyJWT, agendamentoController.deleteAgendamento);
router.put('/agendamentos/:id', validacaoJWT.verifyJWT, validacaoAgendamentos.validateAtualizarAgendamento, agendamentoController.updateAgendamento);
*/



module.exports = router;