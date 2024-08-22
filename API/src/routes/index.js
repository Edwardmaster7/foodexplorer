const { Router } = require("express")

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const ingredientsRouter = require('./ingredients.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/ingredients', ensureAuthenticated, ingredientsRouter);

module.exports = routes;