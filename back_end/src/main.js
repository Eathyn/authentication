const express = require('express')
const cookieParser = require('cookie-parser')
const accounts = require('./accounts.js') 

const app = express()
const port = 8000

app.use(cookieParser())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, test-token')
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

app.get('/', (req, res) => {
  res.send('GET /')
})

app.post('/login', (req, res) => {
  const { name, password } = req.body
  const isMatch = accountMatch(name, password)
  if (isMatch) {
    res
      .cookie('test-token', 'my-test-token')
      .status(200)
      .send({ 'test-token': 'my-test-token' })
  } else {
    res.status(401).send('Account or password is wrong.')
  }
})

app.get('/test-cookie-header', (req, res) => {
  const { cookies } = req
  if (cookies) {
    console.log('cookie: ', cookies)
    res.status(200).send('The server get cookies successfully')
  } else {
    res.status(401).send('The browser didn\'t send cookies')
  }
})

app.listen(port, () => console.log(`server running at port ${port}...`))
