const TimeTable = require('../Models/timeTable')
const express = require('express')
const jwt = require('jsonwebtoken')

const timeTableRouter = express.Router()

timeTableRouter.get('/createMany', async (req, res) => {
    const newDate = new Date
    const y = newDate.getFullYear()
    const m = newDate.getMonth() + 1
    const d = newDate.getDate()
    const today = `${y}-${m}-${d}`

    let horarios = []

    for (let i = 8; i <= 18; i++) {

        const table = {
            time: `${i}`,
            user: null,
            date: today,
        }

        horarios.push(table)
    }

    //Verificar se o banco já foi populado com os horários do dia
    const existsToday = await TimeTable.findOne({ date: today })

    if (!existsToday) {
        await TimeTable.insertMany(horarios)
    }
    res.json(horarios)
})

timeTableRouter.get('/show', async (req, res) => {
    const newDate = new Date
    const y = newDate.getFullYear()
    const m = newDate.getMonth() + 1
    const d = newDate.getDate()
    const today = `${y}-${m}-${d}`
    const e = await TimeTable.find({ date: today }).populate('user')
    res.json(e)
})

timeTableRouter.get('/view/:date/:hour', async (req, res) => {
    const e = await TimeTable.findOne({ date: req.params.date, time: req.params.hour })
    res.json(e)
})

timeTableRouter.put('/put/:date/:hour', async (req, res) => {
    const token = req.headers.cookie.split('token=')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = decodedToken.id;

    await TimeTable.updateOne({ time: req.params.hour, date: req.params.date }, { user: user });
});

module.exports = timeTableRouter