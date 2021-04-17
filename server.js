require('dotenv').config()
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello')
})

const mongo_url = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PW + '@cluster0.fleiw.mongodb.net/whiteboard?retryWrites=true&w=majority'
// const local_url = 'mongodb://localhost:27017/whiteboard-03'

const mongoose = require('mongoose');
mongoose.connect(mongo_url,
  {useNewUrlParser: true, useUnifiedTopology: true});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
  }
)

require('./controllers/quizzes-controller')(app)
require('./controllers/question-controller')(app)
require('./controllers/quiz-attempts-controller')(app);

app.listen(process.env.PORT || 4000)