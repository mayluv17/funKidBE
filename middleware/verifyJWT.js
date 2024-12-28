const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const rt = req.cookies.jwt;

  if (rt == '' || rt == undefined)
    return res.status(401).json({ message: 'your session has expired' });

  jwt.verify(rt, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token

    if (Date.now() > decoded.exp * 1000)
      return res.status(401).json({ message: 'your session has expired' });

    req.user = decoded.username;
    req.userId = decoded.userId;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
