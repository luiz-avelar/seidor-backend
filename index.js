const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
