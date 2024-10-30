const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  if (!secret) return res.status(500).json({ error: 'JWT_SECRET not defined' });

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };