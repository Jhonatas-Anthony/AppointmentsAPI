const jwt = require('jsonwebtoken');
const {promisify} = require('util')

async function authMiddleware(req, res, next) {
    console.log(req.headers)
    
    const token = req.headers.cookie.split('token=')[1]
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Você não está logado' });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decoded)

    next()
}

module.exports = authMiddleware