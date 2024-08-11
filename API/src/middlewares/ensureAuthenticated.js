const { verifyToken } = require('./configs/auth');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await verifyToken(token);

    request.user = { id: decoded.userId };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;