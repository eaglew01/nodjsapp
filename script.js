const express = require('express')
const app = express()

app.get('/test', function (req, res) {
  res.send('Hello World2')
})

app.listen(3000)