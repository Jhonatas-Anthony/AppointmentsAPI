const express = require('express');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const TimeTable = require('../Models/timeTable');

const userRouter = express.Router();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json('Senhas incompatíveis');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json('Esse e-mail já está sendo usado');
    }

    // Criar um hash da senha antes de salvar no banco de dados
    const hashedPassword = await argon2.hash(password, process.env.BCRYPT_SEED);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ops, algo de inesperado aconteceu' });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = signToken(user.id);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar o login' });
  }
});

userRouter.get('/logout', async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.redirect('/login');
});

// Essa rota funcionará como um middleware
userRouter.get('/checkAuth', async (req, res) => {
  // Se esta área estiver retornando undefined, o usuário não está autenticado
  if (req.headers.cookie == undefined) {
    return res.json({ isAuthenticated: false });
  }
  try {
    const token = req.headers.cookie.split('token=')[1];
    if (!token) {
      // Se o token não estiver presente, o usuário não está autenticado
      return res.json({ isAuthenticated: false });
    }
    // Outro try, para verificar se o token presente é válido.
    try {
      // Verifica se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      // Verifica se o usuário existe no banco de dados
      if (!user) {
        // Se o usuário não existir
        return res.json({ isAuthenticated: false });
      }

      // Se o usuário existir
      return res.json({ isAuthenticated: true, user });
    } catch (error) {
      return res.json({ isAuthenticated: false });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Erro ao verificar a autenticação do usuário' });
  }
});

userRouter.get('/view/:id', async(req, res) => {
  const id = req.params.id
  const user = await User.findOne({
    where: {id: id}
  })
  res.json(user.name)
})

userRouter.get('/populate', async (req, res) => {
  const data = [
    {
      name: 'Jhonatas Anthony',
      email: 'jhonatas@gmail.com',
      password: await argon2.hash('password', process.env.BCRYPT_SEED),
    },
    {
      name: 'Garrincha Medeiros',
      email: 'adm@gmail.com',
      password: await argon2.hash('password', process.env.BCRYPT_SEED),
    },
    {
      name: 'Lucca Tattine',
      email: 'sub@gmail.com',
      password: await argon2.hash('password', process.env.BCRYPT_SEED),
    },
    {
      name: 'Caruso Ignácio',
      email: 'grosso@gmail.com',
      password: await argon2.hash('password', process.env.BCRYPT_SEED),
    },
    {
      name: 'Lilian Carol',
      email: 'lex@gmail.com',
      password: await argon2.hash('password', process.env.BCRYPT_SEED),
    },
  ];
  try {
    const users = await User.bulkCreate(data);
    res.status(200).json({ message: 'Banco populado com sucesso', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao popular banco' });
  }
});

module.exports = userRouter;