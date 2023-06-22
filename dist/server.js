"use strict";const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

require('./database');

app.disable('x-powered-by');
app.disable('server');

app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3000);
