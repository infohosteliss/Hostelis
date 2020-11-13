require('dotenv').config();
const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			host: process.env.SWAGGER_HOST,
			basePath: process.env.SWAGGER_BASE_PATH
		}
	},
	apis: ['./swagger-api/**.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//routes
routes(app);


module.exports = app;

//       $P$BGRJxIeL5CAhoidR.qCTeWc.IR2Zcg0
