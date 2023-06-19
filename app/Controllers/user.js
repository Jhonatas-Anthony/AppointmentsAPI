const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

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

        jwt.sign({ userId: newUser._id }, 'segredo');

        // Salvar o usuário no banco de dados
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso'});
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

        jwt.sign({ userId: user._id }, 'segredo');

        res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar o login' });
    }
});

module.exports = userRouter;
