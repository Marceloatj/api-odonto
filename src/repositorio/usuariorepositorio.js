const connection = require('../infra/connection');
const bcrypt = require("bcrypt");

// novo mysql

const buscarUsuarios = async () => {
    const [usu] = await connection.execute('SELECT * FROM usuarios');
    return usu;
};

const novoUsuario = async (usu) => {
    
    const { nome, email, senha } = usu;

    // create password
    const salt = await bcrypt.genSalt(4);
    const passwordHash = await bcrypt.hash(senha, salt);

    const dateUTC = new Date(Date.now()).toUTCString();
    
    const query = 'INSERT INTO usuarios ( nome, email, senha, data) VALUES ( ?, ?, ?, now() )';

    const [createdUsuario] = await connection.execute( query, [ nome, email, passwordHash ]);

    return {insertId: createdUsuario.insertId};
};

const deletarUsuario = async (id) => {

    const query = 'DELETE FROM usuarios WHERE id = ?';

    const [removedUsuario] = await connection.execute(query, [id] );

    return removedUsuario;
};

const atualizarUsuario = async (id, usu) => {

    const { nome, email } = usu;

    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';

    const [updatedUsuario] = await connection.execute(query, [nome, email, id] );

    return updatedUsuario;
};


module.exports = {
    // novo mysql
    buscarUsuarios,
    novoUsuario,
    deletarUsuario,
    atualizarUsuario
};