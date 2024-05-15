const db = require('mysql2/promise')
const dbConfig = require('../dbConfig.json')

const colorModel = require('./color-model')

class SubjectModel {

    // Получение предмета (код предмета)
    // Возвращает объект предмета
    // Расширен объектом цвета
    async findOne(subjectId) {
        try {
            const conn = await db.createConnection(dbConfig)
            const [result] = await conn.execute("SELECT * FROM Subjects WHERE ID = ?", [subjectId])
            let subject = result[0]
            // разворачивание поля объектом цвета
            subject.color = await colorModel.findOne(subject.color)
            await conn.end();
            return subject
        } catch (e) {
            throw e
        }
    }

    // Получение предметов юзера (код пользователя)
    async getByUserId(userId) {
        try {
            const sql = "SELECT * FROM Subjects WHERE user = ?"
            const conn = await db.createConnection(dbConfig)
            const [result] = await conn.execute(sql, [userId])
            for (let i = 0; i < result.length; i++) {
                // разворачивание поля объектом цвета
                result[i].color = await colorModel.findOne(result[i].color)
            }
            await conn.end();
            return result
        } catch (e) {
            throw e
        }
    }

    // Создание предмета (название, код пользователя, код цвета)
    async create(name, userId, colorId) {
        try {
            const sql = "INSERT INTO Subjects (name, user, color) VALUES (?, ?, ?)"
            const conn = await db.createConnection(dbConfig)
            await conn.execute(sql, [name, userId, colorId])
            await conn.end();
        } catch (e) {
            throw e
        }
    }

    // Обновление предмета (код предмета, название, код цвета)
    async update(subjectId, name, colorId) {
        try {
            const conn = await db.createConnection(dbConfig)
            const sql = "UPDATE Subjects SET name = ?, color = ? WHERE ID = ?"
            await conn.execute(sql, [name, colorId, subjectId])
            await conn.end();
        } catch (e) {
            throw e
        }
    }

    // Удаление предмета (код предмета)
    async delete(subjectId) {
        try {
            const conn = await db.createConnection(dbConfig)
            await conn.execute("DELETE FROM Subjects WHERE ID = ?", [subjectId])
            await conn.end();
        } catch (e) {
            throw e
        }
    }
}

module.exports = new SubjectModel()
