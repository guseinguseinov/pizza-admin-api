import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
 
export function generateAccessToken( data ) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY ,(err, user) => {
  
      if (err) return res.sendStatus(403);
      req.user = user;
  
      next();
    });
}
