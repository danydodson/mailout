const express = require('express')
const request = require('request')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.static('public'))

// SIGNUP
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

// POST
app.post('/', function(req, res) {
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email = req.body.email

  var data = {
    members: [
      {
        email_address: email,
        merge_fields: { FNAME: firstName, LNAME: lastName },
        status: 'subscribed'
      }
    ]
  }

  var jsonData = JSON.stringify(data)

  var options = {
    url: process.env.URL,
    method: 'POST',
    headers: { Authorization: process.env.HEADERS },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.sendFile(__dirname + '/public/success.html')
    } else {
      res.sendFile(__dirname + '/public/failure.html')
    }
  })
})

// POST FAILURE
app.post('/failure', function(req, res) {
  res.redirect('/')
})

// START SERVER
app.listen(process.env.PORT || 3000, function() {
  console.log(`Server started on port ${process.env.PORT || 3000}`)
})
