const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');

const userRouter = express.Router();
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Verificar se a senha e a confirmação de senha coincidem
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'As senhas não coincidem' });
        }

        // Verificar se o usuário já existe com o mesmo email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Já existe um usuário com esse email' });
        }

        // Criar um hash da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o novo usuário
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Salvar o usuário no banco de dados
        await newUser.save();

        res.status(201).redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(User)
        // Verificar se o usuário existe com o mesmo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        // Verificar se a senha é válida
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = signToken(user._id)
        res.cookie('token', token, { httpOnly: true });
        res.status(200).redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar o login' });
    }
});

userRouter.get('/logout', async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    res.redirect('/login')
})

userRouter.get('/checkAuth', async (req, res) => {
    if(req.headers.cookie == undefined){
        return res.json({ isAuthenticated: false });
    }
    try {


        const token = req.headers.cookie.split('token=')[1]

        console.log(token)
        if (!token) {
            // Se o token não estiver presente, o usuário não está autenticado
            return res.json({ isAuthenticated: false });
        }

        try {
            // Verifica se o token é válido
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verifica se o usuário existe no banco de dados
            const user = await User.findById(decoded.id);
            if (!user) {
                // Se o usuário não existir
                return res.json({ isAuthenticated: false });
            }

            // Se o usuário existir
            return res.json({ isAuthenticated: true });
        } catch (error) {
            return res.json({ isAuthenticated: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao verificar a autenticação do usuário' });
    }
});

userRouter.get('/populate', async (req, res) => {
    const data = [
        { name: 'Jhonatas Anthony', email: 'jhonatas@gmail.com', password: await bcrypt.hash('123', 10) },
        { name: 'Garrincha', email: 'adm@gmail.com', password: await bcrypt.hash('123', 10) },
        { name: 'Luca', email: 'sub@gmail.com', password: await bcrypt.hash('123', 10) },
        { name: 'Caruso', email: 'grosso@gmail.com', password: await bcrypt.hash('123', 10) },
        { name: 'Lilica', email: 'lex@gmail.com', password: await bcrypt.hash('123', 10) }
    ]
    try {
        const users = await User.insertMany(data)
        res.status(200).json({ message: 'banco populado com sucesso', users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao popular banco' })
    }
})

module.exports = userRouter;
