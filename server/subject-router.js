const subjectController = require('../controllers/subject-controller')
const passport = require('passport')
// определяем Router
const subjectRouter = require("express").Router()

subjectRouter.route('/')
    .post(passport.authenticate('jwt', {session: false}), subjectController.create)// эндпоинт - создания
    .get(passport.authenticate('jwt', {session: false}), subjectController.getAll)// эндпоинт - получения предметов по коду юзера

subjectRouter.route('/:ID')
    .get(passport.authenticate('jwt', {session: false}), subjectController.findOne) // эндпоинт - нахождения предмета
    .patch(passport.authenticate('jwt', {session: false}), subjectController.update) // эндпоинт - обновления предмета
    .delete(passport.authenticate('jwt', {session: false}), subjectController.delete) // эндпоинт - удаления предмета

module.exports = subjectRouter
