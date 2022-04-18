'use strict';

require('dotenv').config();

const http = require('http');

const app = require('./application');
const models = require('./models');

(async () => {
  try {
    await models.sequelize.sync();

    const server = http.createServer(app);
    const port = process.env.PORT || 8080;

    server.listen(port, () => {
      console.info(`Server running on ${port} port`);
    });
  } catch (err) {
    console.error(err);
  }
})();
