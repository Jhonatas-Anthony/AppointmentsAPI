const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const TimeTable = require('../Models/timeTable');
const User = require('../Models/user');

const timeTableRouter = express.Router();

// Estrutura padrão
const newDate = new Date();
const y = newDate.getFullYear();
const m1 = newDate.getMonth() + 1;
const d1 = newDate.getDate();
const m = m1.toString().padStart(2, '0');
const d = d1.toString().padStart(2, '0');
const today = `${y}-${m}-${d}`;

timeTableRouter.get('/createMany', async (req, res) => {
  try {
    const horarios = [];
    for (let i = 8; i <= 18; i++) {
      const table = {
        time: `${i}`,
        userId: null,
        date: today,
      };
      horarios.push(table);
    }

    // Verificar se o banco já foi populado com os horários do dia
    const existsToday = await TimeTable.findOne({ where: { date: today } });

    if (!existsToday) {
      await TimeTable.bulkCreate(horarios);
    }

    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar horários' });
  }
});

timeTableRouter.get('/show', async (req, res) => {
  try {
    const horarios = await TimeTable.findAll({ where: { date: today }});
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar horários' });
  }
});

timeTableRouter.get('/createMany/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const horarios = [];

    for (let i = 8; i <= 18; i++) {
      const table = {
        time: `${i}`,
        userId: null,
        date: date,
      };

      horarios.push(table);
    }

    const existsToday = await TimeTable.findOne({ where: { date: date } });

    if (!existsToday) {
      await TimeTable.bulkCreate(horarios);
    }

    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar horários' });
  }
});

timeTableRouter.get('/show/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const horarios = await TimeTable.findAll({ where: { date: date }});
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar horários' });
  }
});

timeTableRouter.get('/view/:date/:hour', async (req, res) => {
  try {
    const date = req.params.date;
    const hour = req.params.hour;
    const horario = await TimeTable.findOne({ where: { date: date, time: hour }});
    res.json(horario)
    /* let user = null
    if(horario.userId !== null){
      user = await User.findOne({where: {id: horario.userId}})
    }
    res.json({'horario': horario, 'user': user}); */
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar horário' });
  }
});

timeTableRouter.put('/put/:date/:hour', async (req, res) => {
  try {
    const token = req.headers.cookie.split('token=')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const date = req.params.date;
    const hour = req.params.hour;

    const timetable = await TimeTable.findOne({ where: { date: date, time: hour } });

    if (!timetable || timetable.userId !== null) {
      throw Error('Operação inválida');
    }

    await TimeTable.update({ userId: userId }, { where: { date: date, time: hour } });
    res.json({ message: 'Agendamento realizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Erro ao realizar o agendamento' });
  }
});

timeTableRouter.put('/cancel/:date/:hour', async (req, res) => {
  try {
    const token = req.headers.cookie.split('token=')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const date = req.params.date;
    const hour = req.params.hour;
    console.log('passo')
    const timetable = await TimeTable.findOne({ where: { date: date, time: hour } });
    console.log('passo')
    if (!timetable || timetable.userId !== userId) {
      throw Error('Operação inválida');
    }

    await TimeTable.update({ userId: null }, { where: {date: date, time: hour } });
    res.json({ message: 'Agendamento cancelado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Erro ao cancelar o agendamento' });
  }
});

module.exports = timeTableRouter;