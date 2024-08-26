const { Router } = require("express")

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const ingredientsRouter = require('./ingredients.routes');
const dishesRoutes = require('./dishes.routes');
const searchRoutes = require('./search.routes');
const categoriesRoutes = require("./categories.routes");

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/ingredients', ensureAuthenticated, ingredientsRouter);
routes.use('/dishes', ensureAuthenticated, dishesRoutes);
routes.use('/search', ensureAuthenticated, searchRoutes);
routes.use('/categories', ensureAuthenticated, categoriesRoutes);

module.exports = routes;