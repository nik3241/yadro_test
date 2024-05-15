// подключение библиотек
const express = require('express')
const request = require('request')

const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = require('./errorHandler')
const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server')

const apiRouter = require("express").Router()

// инициализация приложения на  фреймворке express
const app = express()
const port = process.env.PORT || 3500

// // подключение промежуточного ПО обработки HTTP запросов
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

// // подключение роутов сервера
// app.get('/live', getQuotesLive(req, res, next))
// // (new SubjectController().getQuotesLive())




const _data = {
    "quotes": {
        "USDAUD": 1.278342,
        "USDEUR": 1.278342,
        "USDGBP": 0.908019,
        "USDPLN": 3.731504
    },
    "source": "USD",
    "success": true,
    "timestamp": 1432400348
}

app.get("/live", (req, res) => {
    try {
        const apiURL = "https://api.apilayer.com/currency_data/live"
        const apiKEY = "7fuk7lQvRXyvUMhQvz3kGiXJ3K2StGXE"
        let options = {
            header: {
                apikey: apiKEY
            },
            method: "GET",
            host: "api.apilayer.com"
        }
        const myReq = request(apiURL, options, (response) => {
            console.log("колбэк запроса к апи", response)
        }).end()
        console.log("myReq", myReq)
        if (_data) {
            console.log("res res.params", res.params)
            console.log("res res.body", res.body)
            console.log("res res.writeHead", res.writeHead)
            console.log("res res.query", res.query)
            console.log("res res.header", res.header)
            // res.header(200, { 'Content-Type': 'application/json' })
            // res.headers
            console.log("2 res res.getHeaders", res.getHeaders())
            res
                .appendHeader("method", "get")
                .appendHeader("my-header", "hueta")
                .json(_data)
            console.log("3 res res.getHeaders", res.getHeaders())



        }
        else
            res.status(404).json({ message: "Not found" })
    } catch (e) {
        console.log('Ошибка из контроллера QuotesLiveController().getAll() -->', e)
        errorHandler(res, e)
    }
})


// apiRouter.use('/subject', subjectRouter) // эндпоинт - предметы





function HiServer(req, res) {
    res.send(_data)
    res.send('<h1 style="margin: auto; color: darkslategrey">Сервер работает</h1>')

}
// пустой роут
app.get('/', HiServer)
// запуск сервера
app.listen(port, () => console.log(`Server has been started on port: ${port}...`))
