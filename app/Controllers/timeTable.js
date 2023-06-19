const express = require('express')
const TimeTable = require('../Models/timeTable')

const timeTableRouter = express.Router()

timeTableRouter.get('/show', async (req, res) => {
    const newDate = new Date
    const y = newDate.getFullYear()
    const m = newDate.getMonth() + 1
    const d = newDate.getDate()
    const today = `${d}-${m}-${y}`

    let horarios = []

    for (let i = 8; i <= 18; i++) {

        const table = {
            time: `${i}`,
            user: null,
            date: today,
        }

        horarios.push(table)
    }
    res.json(horarios)
    //Verificar se o banco já foi populado com os horários do dia
    const existsToday = await TimeTable.findOne({ date: today })

    if (!existsToday) {
        await TimeTable.insertMany(horarios)
    }
})

timeTableRouter.get('/view/:date/:hour', async (req, res) => {
    const e = await TimeTable.findOne({ date: req.params.date, time: req.params.hour })
    res.json(e)
})

timeTableRouter.put('/put/:date/:hour', async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token, { complete: true });
    const user = decodedToken.payload.user;

    await TimeTable.updateOne({ time: req.params.hour }, { user: user });

});

module.exports = timeTableRouter