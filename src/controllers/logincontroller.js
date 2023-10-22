const loginRepo = require('../repositorio/loginrepositorio');
const logger = require('../logger');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

  // novo mysql

const autenticacaoLogin = async (req, res) => {
  
  const { EMAIL, SENHA } = req.body;

  // verifica se existe o login
  const user = await loginRepo.checkloginExists(EMAIL);

  if (!user) {
      logger.error(`autenticacaoLogin - Usuário não encontrado! email=${EMAIL}`);
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // verifica se a senha esta correta
  const checkPassword = await bcrypt.compare(SENHA, user.senha);

  if (!checkPassword) {
      logger.error('autenticacaoLogin - Senha inválida!');
    return res.status(422).json({ msg: "Senha inválida" });
  }

    //auth ok
    const id = user.idusuario;
    const token = jwt.sign(
      { id }, 
      process.env.SECRET, 
      { expiresIn: 3000 } // expira em 1 hora
    );

  res.status(200).json({ 
    msg: "Autenticação realizada com sucesso!", 
    auth: true, 
    token: token,
    IDUSUARIO: user.idconta,
    NOME: user.nome,
    PERFIL: user.perfil
   });

  
};

/*const realizarlogout = async (req, res) => {
  res.json({ auth: false, token: null });
};*/




module.exports = {
    //novo mysql
    autenticacaoLogin,
    //realizarlogout
};