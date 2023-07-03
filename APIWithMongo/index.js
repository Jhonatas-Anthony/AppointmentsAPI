const express = require('express');
const connectDB = require('./db');
const path = require('path');
const authMiddleware = require('./utils/authMiddleware')
require('dotenv').config();

const user = require('./app/Controllers/user');
const timeTable = require('./app/Controllers/timeTable')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Conectando ao banco de dados
connectDB()

// Rotas
app.use('/user', user)
app.use('/time', timeTable)


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'dashboard/index.html'));
});

// Rota para exibir o formulário de cadastro
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'user/cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'user/login.html'));
});

app.use('/timetable', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'agenda/viewTime.html'))
})

app.use('/fulltimetable', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'agenda/viewOtherTime.html'))
})

app.use('/schedule', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'agenda/schedule.html'))
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});