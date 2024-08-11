const jwt = require('jsonwebtoken');

// Fetch the secret key from an environment variable
const secretKey = process.env.JWT_SECRET_KEY;

// Sign a new JWT token
const signToken = (payload) => {
  return jwt.sign(payload, secretKey, { algorithm: 'RS256', expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        // Token is invalid
        reject(err);
      } else {
        // Token is valid
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  signToken,
  verifyToken,
};
