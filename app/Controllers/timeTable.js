const TimeTable = require('../Models/timeTable')
const express = require('express')
const jwt = require('jsonwebtoken')

const timeTableRouter = express.Router()

//Codigo padrão
const newDate = new Date
    const y = newDate.getFullYear()
    const m1 = newDate.getMonth() + 1
    const d1 = newDate.getDate()
    const m = m1.toString().padStart(2, '0')
    const d = d1.toString().padStart(2, '0')
    const today = `${y}-${m}-${d}`

timeTableRouter.get('/createMany', async (req, res) => {
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
    const e = await TimeTable.find({ date: today }).populate('user')
    res.json(e)
})

timeTableRouter.get('/createMany/:date', async (req, res) => {
    const date = req.params.date

    let horarios = []

    for (let i = 8; i <= 18; i++) {

        const table = {
            time: `${i}`,
            user: null,
            date: date,
        }

        horarios.push(table)
    }
    const existsToday = await TimeTable.findOne({ date: date })

    if (!existsToday) {
        await TimeTable.insertMany(horarios)
    }
    res.json(horarios)

})
timeTableRouter.get('/show/:date', async (req, res) => {
    const date = req.params.date
    const e = await TimeTable.find({ date: date }).populate('user')
    res.json(e)
})

timeTableRouter.get('/view/:date/:hour', async (req, res) => {
    const e = await TimeTable.findOne({ date: req.params.date, time: req.params.hour })
    res.json(e)
})

timeTableRouter.put('/put/:date/:hour', async (req, res) => {
    try {
        const token = req.headers.cookie.split('token=')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = decodedToken.id;
        const a = await TimeTable.findOne({ date: req.params.date, time: req.params.hour })
        const regex = `${a.user}`

        regex.split('"')
        //Garantir que um usuário não vai poder editar o registrou de outro
        if (a.user === null || regex === decodedToken.id) {
            const e = await TimeTable.updateOne({ time: req.params.hour, date: req.params.date }, { user: user });
            res.json(e)
        }
        else {
            throw Error("Operação inválida")
        }
    } catch (error) {
        res.status(403).json(error)
    }
});

module.exports = timeTableRouter