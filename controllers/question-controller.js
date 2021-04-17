const questionsService = require('../services/questions-service')

module.exports = (app) => {
  const findAllQuestions = (req, res) => {
    questionsService.findAllQuestions()
        .then(questions => res.json(questions))
  }

  const findQuestionsForQuiz = (req, res) => {
    const quizId = req.params['qid']
    questionsService.findQuestionsForQuiz(quizId)
        .then(questions => res.json(questions))
  }

  const findQuestionById = (req, res) => {
    const questionId = req.params['qid']
    questionsService.findQuestionById(questionId)
        .then(question => res.json(question))
  }

  app.get('/api/questions', findAllQuestions)
  app.get('/api/questions/:qid', findQuestionById)
  app.get('/api/quizzes/:qid/questions', findQuestionsForQuiz)
}