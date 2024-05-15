const subjectModel = require('../models/subject-model')
const lessonModel = require('../models/lesson-model')
const errorHandler = require('../utils/errorHandler')

class SubjectController {
    async create(req, res) {
        try {
            let {color, name} = req.body
            color = color.ID ? color.ID : color
            await subjectModel.create(name, req.user.ID, color)
            res.status(200).json({message: 'Предмет создан'})
        } catch (e) {
            console.log('Ошибка из контроллера предметов в create -->', e)
            errorHandler(res, e)
        }
    }

    async getAll(req, res) {
        try {
            const subjects = await subjectModel.getByUserId(req.user.ID)
            if (subjects.length !== 0) res.status(200).json(subjects)
            else res.status(404).json({message: "Предметы не найдены"})
        } catch (e) {
            console.log('Ошибка из контроллера предметов в getAll -->', e)
            errorHandler(res, e)
        }
    }

    async findOne(req, res) {
        try {
            const subject = await subjectModel.findOne(req.params.ID)
            if (subject) res.status(200).json(subject)
            else res.status(404).json({message: "Предмет не найден"})
        } catch (e) {
            console.log('Ошибка из контроллера предметов в findOne -->', e)
            errorHandler(res, e)
        }
    }

    async update(req, res) {
        try {
            let {name, color} = req.body
            color = color.ID ? color.ID : color
            await subjectModel.update(req.params.ID, name, color)
            res.status(200).json({message: 'Предмет обновлен'})
        } catch (e) {
            console.log('Ошибка из контроллера предметов в update -->', e)
            errorHandler(res, e)
        }
    }

    async delete(req, res) {
        try {
            await subjectModel.delete(req.params.ID)
            res.status(200).json({message: 'Предмет и все занятияс ним были удалены'})
        } catch (e) {
            console.log('Ошибка из контроллера предметов в delete -->', e)
            errorHandler(res, e)
        }
    }
}

module.exports = new SubjectController()
