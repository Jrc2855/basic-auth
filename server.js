'use strict';

const express = require('express');
const PORT = process.env.port || 3002;

const app = express();

function start() {
  app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
};

module.exports = { start, app };