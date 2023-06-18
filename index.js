const express = require('express');
const connectDB = require('./db');
const path = require('path');

const user = require('./app/Controllers/user');
const timeSlot = require('./app/Controllers/timeSlot');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectando ao banco de dados
connectDB()

// Middleware para processar requisições JSON
app.use(express.json());

// Rotas
app.use('/user', user);
app.use('/timeslot', timeSlot);

// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'cadastro.html'));
});

app.use('/user/signup', user)

// Rota para exibir o formulário de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html'));
});
app.use('/user/login', user)

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});