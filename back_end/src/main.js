const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const accounts = require('./accounts.js') 

const app = express()
const port = 8000
const JWT_SECRET = 'jwt-secret'

app.use(cookieParser())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
app.use(express.json())

function accountMatch(name, password) {
  let isMatch = false
  accounts.forEach((account) => {
    isMatch = account.name === name && account.password === password;
  })
  return isMatch
}

app.post('/login', (req, res) => {
  const { name, password } = req.body
  const isMatch = accountMatch(name, password)
  if (isMatch) {
    const token = jwt.sign({ user: 'eathyn' }, JWT_SECRET)
    res.status(200).send({ token })
  } else {
    res.status(401).send('Account or password is wrong.')
  }
})

app.get('/test-send-token', (req, res) => {
  const token = req.header('Authorization').split(' ')[1]
  if (token) {
    res.status(200).send('The server get token successfully')
  } else {
    res.status(401).send('The browser didn\'t send token')
  }
})

app.listen(port, () => console.log(`server running at port ${port}...`))
