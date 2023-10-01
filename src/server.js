const app = require('./app');
require('dotenv').config();
const logger = require('./logger');

const PORT = process.env.PORT || 3333;

app.listen(PORT, '0.0.0.0', ()=> {
    logger.info('-- API TESTE iniciada');
    logger.info(`Server runner or port ${PORT}`);
    console.log(`Server runner or port ${PORT}`);
});

