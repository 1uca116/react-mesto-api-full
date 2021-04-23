const jwt = require('jsonwebtoken');
const UnauthorizedError = require ('../errors/authorization-error')
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'qwerty1234';

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedError(`Необходима авторизация, ${secret}`);
  }

  req.user = payload;

  next();
};