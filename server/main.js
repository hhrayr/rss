import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import staticHandlers from './handlers/static';
import applicationHandler from './handlers/application';
import apiHandler from './handlers/api';

const server = express();
server.use(compression());
server.use(cookieParser());
staticHandlers(server);
server.use('/api', apiHandler);
server.use(applicationHandler);

server.use((err, req, res, next) => {
  res.status(500).send();

  next();
});

export default server;
