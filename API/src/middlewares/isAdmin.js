const AppError = require('../utils/AppError');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return new AppError('Insuficient privileges to perform this action', 403);
    }
    next();
  };

module.exports = isAdmin;