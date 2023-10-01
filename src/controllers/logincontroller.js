const loginRepo = require('../repositorio/loginrepositorio');
const logger = require('../logger');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

  // novo mysql

const autenticacaoLogin = async (req, res) => {
  
  const { email, senha } = req.body;

  // verifica se existe o login
  const user = await loginRepo.checkloginExists(email);

  if (!user) {
      logger.error(`autenticacaoLogin - Usuário não encontrado! email=${email}`);
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // verifica se a senha esta correta
  const checkPassword = await bcrypt.compare(senha, user.senha);

  if (!checkPassword) {
      logger.error('autenticacaoLogin - Senha inválida!');
    return res.status(422).json({ msg: "Senha inválida" });
  }

    //auth ok
    const id = user.id;
    const token = jwt.sign(
      { id }, 
      process.env.SECRET, 
      { expiresIn: 600 } // expira em 10 minutos
    );

  res.status(200).json({ msg: "Autenticação realizada com sucesso!", auth: true, token: token });

  
};

/*const realizarlogout = async (req, res) => {
  res.json({ auth: false, token: null });
};*/




module.exports = {
    //novo mysql
    autenticacaoLogin,
    //realizarlogout
};