const connection = require('../infra/connection');


// novo mysql

const buscarAgendamentos = async () => {
    const [agen] = await connection.execute('SELECT * FROM agendamentos');
    return agen;
};

const novoAgendamento = async (agen) => {
    
    const { descricao } = agen;

    const dateUTC = new Date(Date.now()).toUTCString();
    
    const query = 'INSERT INTO agendamentos ( descricao, data) VALUES (?, now() )';

    const [createdAgendamento] = await connection.execute( query,[ descricao ]);

    return {insertId: createdAgendamento.insertId};
};

const deletarAgendamento = async (id) => {

    const query = 'DELETE FROM agendamentos WHERE id = ?';

    const [removedAgen] = await connection.execute(query, [id] );

    return removedAgen;
};

const atualizarAgendamento = async (id, agen) => {

    const { descricao } = agen;

    const query = 'UPDATE agendamentos SET descricao = ? WHERE id = ?';

    const [updatedAgen] = await connection.execute(query, [descricao, id] );

    return updatedAgen;
};


module.exports = {
    // novo mysql
    buscarAgendamentos,
    novoAgendamento,
    deletarAgendamento,
    atualizarAgendamento
};