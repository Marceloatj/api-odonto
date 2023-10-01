const connection = require('../infra/connection');


// novo mysql

const checkloginExists = async (email) => {

    const query = 'SELECT * FROM usuarios where email = ?';

    const [usu] = await connection.execute(query, [email]);
    return usu[0];
};



module.exports = {
    // novo mysql
    checkloginExists
};