const express = require('express');
const connectDB = require('./db');
const path = require('path');

const user = require('./app/Controllers/user');
const timeTable = require('./app/Controllers/timeTable')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectando ao banco de dados
connectDB()

// Rotas
app.use('/user', user)
app.use('/time', timeTable)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'dashboard/index.html'));
});

// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'user/cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'user/login.html'));
});

app.use('/timetable', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'agenda/view/viewTime.html'))
})

app.use('/schedule', (req, res) => {
    res.sendFile(path.join(__dirname, 'modules', 'agenda/view/schedule.html'))
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});