const connection = require('../infra/connection');
const bcrypt = require("bcrypt");

// novo mysql

const buscarUsuarios = async () => {
    const [usu] = await connection.execute('SELECT * FROM usuario');
    return usu;
};

const novoUsuario = async (usu) => {
    
    const { NOME, PERFIL, CPF_CNPJ, EMAIL, SENHA, CONTATO, ENDERECO, NUMERO, CEP, BAIRRO, CIDADE, UF  } = usu;

    // create password
    const salt = await bcrypt.genSalt(4);
    const passwordHash = await bcrypt.hash(SENHA, salt);
    
    var query = `INSERT INTO usuario ( nome, perfil,${!CPF_CNPJ ? '' : ' cpf_cnpj, '} email, senha,${!CONTATO ? '' : ' contato, '}${!ENDERECO ? '' : ' endereco, '}${!NUMERO ? '' : ' numero, '}${!CEP ? '' : ' cep, '}${!BAIRRO ? '' : ' bairro, '}${!CIDADE ? '' : ' cidade, '}${!UF ? '' : ' uf, '} data) `;
    var queryValues = `VALUES ( "${NOME}",${!PERFIL ? '"CLIENTE", ' : `"${PERFIL}", `}${!CPF_CNPJ ? '' : ` "${CPF_CNPJ}", `} "${EMAIL}", "${passwordHash}",${!CONTATO ? '' : ` "${CONTATO}", `}${!ENDERECO ? '' : ` "${ENDERECO}", `}${!NUMERO ? '' : ` "${NUMERO}", `}${!CEP ? '' : ` "${CEP}", `}${!BAIRRO ? '' : ` "${BAIRRO}", `}${!CIDADE ? '' : ` "${CIDADE}", `}${!UF ? '' : ` "${UF}", `} now() )`;
    const querys = query + queryValues;
    const [createdUsuario] = await connection.execute( querys );

    return {insertId: createdUsuario.insertId};
};

const deletarUsuario = async (user) => {

    const { IDUSUARIO } = user;
  
    const query = 'DELETE FROM usuario WHERE idusuario = ?';
  
    const [removedUser] = await connection.execute(query, [IDUSUARIO] );
  
    return removedUser;
  };

const atualizarUsuario = async (usu) => {

    const { IDUSUARIO, NOME, PERFIL, CPF_CNPJ, EMAIL, SENHA, CONTATO, ENDERECO, NUMERO, CEP, BAIRRO, CIDADE, UF  } = usu;

    if( !NOME && !PERFIL && !CPF_CNPJ && !EMAIL && !SENHA && !CONTATO && !ENDERECO && !NUMERO && !CEP && !BAIRRO && !CIDADE && !UF ){
        return '';
    }else{
        var passwordHash = ''; 
        if(SENHA !== undefined){
            // create password
            const salt = await bcrypt.genSalt(4);
            passwordHash = await bcrypt.hash(SENHA, salt);
        }

        const query = `UPDATE usuario SET ${ !NOME ? '' : ` nome = "${NOME}" , `}${!PERFIL? '' : ` perfil = "${PERFIL}" , `}${ !CPF_CNPJ ? '' : ` cpf_cnpj = "${CPF_CNPJ}" , `}${ !EMAIL ? '' : ` email = "${EMAIL}" , `}${ !SENHA ? '' : ` senha = "${passwordHash}" , `}${ !CONTATO ? '' : ` contato = "${CONTATO}" , `}${ !ENDERECO ? '' : ` endereco = "${ENDERECO}" , `}${ !NUMERO ? '' : ` numero = "${NUMERO}" , `}${ !CEP ? '' : ` cep = "${CEP}" , `}${ !BAIRRO ? '' : ` bairro = "${BAIRRO}" , `}${ !CIDADE ? '' : ` cidade = "${CIDADE}" , `}${ !UF ? '' : ` uf = "${UF}" , `} idusuario = ? WHERE idusuario = ?`;

        const [updatedUsuario] = await connection.execute(query, [ IDUSUARIO ,IDUSUARIO ] );

        return updatedUsuario;
    }
};


module.exports = {
    // novo mysql
    buscarUsuarios,
    novoUsuario,
    deletarUsuario,
    atualizarUsuario
};