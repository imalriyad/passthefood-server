const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: 'Unauthorized Access' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Request' });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken};
