const jwt = require('jsonwebtoken');
const { promisify } = require('util')

async function authMiddleware(req, res, next) {
  if (req.headers.cookie == undefined) {
    return res.status(401).json({ message: 'Você não está logado' });
  }
  const token = req.headers.cookie.split('token=')[1]

  if (!token) {
    // Se o token não estiver presente, o usuário não está autenticado
    return res.json({ isAuthenticated: false });
  }

  if (!token) {
    return res.status(401).json({ message: 'Você não está logado' });
  }

  await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  next()
}

module.exports = authMiddleware