const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Ellsworth Barbell',
        description: 'Workout API'
    },
    host: 'ellsworth-barbell.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);