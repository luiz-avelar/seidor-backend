const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index');
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.use('/cars', controllers.carsController);
app.use('/drivers', controllers.driversController);
app.use('/registry', controllers.registryController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
