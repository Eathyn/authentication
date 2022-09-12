const express = require('express')
const path = require('path')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const accounts = require('./accounts.js')

const app = express()
const port = 8000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Session-ID-Test')
  next()
})
// Session
app.use(sessions({
  secret: 'hello-world',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
}))

function accountMatch(name, password) {
  let isMatch = false
  accounts.forEach((account) => {
    isMatch = account.name === name && account.password === password
  })
  return isMatch
}

app.post('/login', (req, res) => {
  res.status(200).send({ sessionId: req.session.id })

  const { name, password } = req.body
  const isMatch = accountMatch(name, password)
  if (isMatch) {
    res.status(200).send({ sessionId: req.session.id })
  } else {
    res.status(401).send('Account or password is wrong.')
  }
})

app.get('/test-session-header', (req, res) => {
  const sessionId = req.header('Session-ID-Test')
  if (sessionId) {
    res.status(200).send('The server get cookies successfully')
  } else {
    res.status(401).send('The browser didn\'t send cookies')
  }
})

app.listen(port, () => console.log(`server running at port ${port}...`))
