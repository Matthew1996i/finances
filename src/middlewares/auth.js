const jwt = require('jsonwebtoken');
require("dotenv/config");

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  
  if (!authHeaders) return res.status(401).send({ error: 'No token provided' });
  
  const parts = authHeaders.split(' ');
  
  if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });
  
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

  return jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' });

    req.uuid = decoded.id;
    req.message = 'token is valid!';

    return next();
  });
};
