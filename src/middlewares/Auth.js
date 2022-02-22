require('dotenv').config();

const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { verify } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const Auth = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next({ statusCode: UNAUTHORIZED, message: 'Token não encontrado' });
    const userWithoutPassword = verify(authorization, JWT_SECRET);
    req.user = userWithoutPassword;
    return next();
  } catch (e) {
    return next({ statusCode: UNAUTHORIZED, message: 'Token expirado ou inválido' });
  }
};

module.exports = Auth;
