# api-odonto

Depois de pegar o projeto instalar as dependencias.

npm install

Depois renomear arquivo .env.example para .env. 
Dentro do arquivo .env preencher:
- dados de conexão com banco
- colocar uma secret
- colocar uma porta para subir a api

Para rodar a api utilize o comando npm run dev



*Estrutura criada no banco de dados MySql.

CREATE TABLE `odontodb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `perfil` VARCHAR(60) NOT NULL,
  `cpf_cnpj` VARCHAR(45) NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `contato` VARCHAR(45) NULL,
  `endereco` VARCHAR(100) NULL,
  `numero` VARCHAR(45) NULL,
  `cep` VARCHAR(45) NULL,
  `bairro` VARCHAR(100) NULL,
  `cidade` VARCHAR(100) NULL,
  `uf` VARCHAR(45) NULL,
  `data` DATE NULL,
  PRIMARY KEY (`idusuario`));

CREATE TABLE `odontodb`.`agendamento` (
  `idagendamento` INT NOT NULL AUTO_INCREMENT,
  `idusuario` INT NOT NULL,
  `idclinica` INT NOT NULL,
  `data_hora` DATETIME NULL,
  `status` VARCHAR(45) NULL,
  `obsevacao` VARCHAR(255) NULL,
  PRIMARY KEY (`idagendamento`));

CREATE TABLE `odontodb`.`clinica` (
  `idclinica` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `nome_fantasia` VARCHAR(100) NULL,
  `cnpj` VARCHAR(45) NULL,
  `data` DATE NULL,
  PRIMARY KEY (`idclinica`));

CREATE TABLE `odontodb`.`procedimento` (
  `idprocedimento` INT NOT NULL AUTO_INCREMENT,
  `idagendamento` INT NOT NULL,
  `idtipoprocedimento` INT NULL,
  `profissional` VARCHAR(100) NULL,
  `status` VARCHAR(45) NULL,
  `data_hora` DATETIME NULL,
  `observacao` VARCHAR(255) NULL,
  PRIMARY KEY (`idprocedimento`));

CREATE TABLE `odontodb`.`tipo_procedimento` (
  `idtipoprocedimento` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  `preco` DECIMAL(12,2) NULL,
  PRIMARY KEY (`idtipoprocedimento`));
  
  
*Na api as variáveis enviadas pelo JSON precisam ser MAIÚSCULAS.  
  
Segue um exemplo para realizar um login.
Tipo = POST
Url = http://odonto-unitri.ddns.net/odonto/login
Body JSON = 
{
    "EMAIL":"cliente@teste",
    "SENHA":"123"
}

Segue um exemplo para pegar todos usuários.
Tipo = GET
Url = http://odonto-unitri.ddns.net/odonto/usuarios


Segue um exemplo para Atualizar um usuário. 
Tipo = PUT
Url = http://odonto-unitri.ddns.net/odonto/atualiza.usuario
Body JSON =
{
    "NOME" : "Teste",
    "PERFIL": "PROFISSIONAL",
    "CPF_CNPJ" : "",
    "EMAIL" : "teste@teste",
    "SENHA" : "321",
    "CONTATO" : "",
    "ENDERECO" : "",
    "NUMERO" : "",
    "CEP" : "",
    "BAIRRO" : "",
    "CIDADE" : "",
    "UF" : "" 
}
