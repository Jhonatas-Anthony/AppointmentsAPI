const express = require('express');
const TimeSlot = require('../Models/timeSlot');

const timeSlotRouter = express.Router();

timeSlotRouter.get('/', async (req, res) => {
  // Lógica para obter os horários pré-definidos
});

timeSlotRouter.post('/book', async (req, res) => {
  // Lógica para agendar um horário pré-definido
});

module.exports = timeSlotRouter;
