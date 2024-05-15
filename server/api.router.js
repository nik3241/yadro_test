// определяем Router
const apiRouter = require("express").Router()

//определяем эндпоинты (точки) подключения в api
const userRouter = require('./auth-router')
const lessonRouter = require('./lesson-router')
const colorRouter = require('./color-router')
const typeLessonRouter = require('./typeLesson-router')
const subjectRouter = require('./subject-router')
const lecturerRouter = require('./lecturer-router')

//подключаем точки подключения в api
apiRouter.use('/live', userRouter)  // эндпоинт - авторизация
apiRouter.use('/lesson', lessonRouter) // эндпоинт - занятия
apiRouter.use('/color', colorRouter) // эндпоинт - цвета
apiRouter.use('/typeLesson', typeLessonRouter) // эндпоинт - типы занятия
apiRouter.use('/subject', subjectRouter) // эндпоинт - предметы
apiRouter.use('/lecturer', lecturerRouter) // эндпоинт - преподаватели

module.exports = apiRouter
