const Database = require('../db/config.js')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const password = req.body.password

    let roomId = ''
    let isRoom = true

    // Função para gerar ids aleatórios
    function gerarId() {
      let FroomId = ''
      for (let i = 0; i < 6; i++) {
        FroomId += Math.floor(Math.random() * 10).toString()
      }
      return FroomId
    }

    // Verficar se esse id já existe no banco de dados
    const roomsExistIds = await db.all(`SELECT id FROM rooms`)

    while (isRoom) {
      roomId = gerarId()

      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

      if (!isRoom) {
        //  Inserir a sala no banco de dados
        await db.run(`INSERT INTO rooms (
              id,
              password
          )VALUES (
              ${parseInt(roomId)},
              '${password}'
          )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()

    const roomId = req.params.roomId ? req.params.roomId : req.body.roomId

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )

    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )

    let isNoQuestions
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    }

    await db.close()

    res.render('room', { roomId, questions, questionsRead, isNoQuestions })
  }
}
