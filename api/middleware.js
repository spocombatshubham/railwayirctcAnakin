//handles token authentication
const jwt=require('jsonwebtoken');
 function tokenverify(req,res,next){
    const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token is not provided' });
  }

  jwt.verify(token.split(' ')[1], 'secure_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token authentication failed' });
    }
    req.user = decoded;
    next();
  });

 }
 function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not Authorized' });
    }
    next();
  }

  module.exports = { tokenverify, isAdmin };