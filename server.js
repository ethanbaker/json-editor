//Import and configure express.js
let express = require('express')
let app = express()
let server = require('http').Server(app)

//Run the express server
app.use(express.static(__dirname + '/'));
 
app.get('~/.bash/json-editor/', function (req, res) {
  res.sendFile("index.html")
})

server.listen(80, function() {
  console.log(`Listening on ${server.address().port}`)
})

//Open the file and save the info to send to the web server
const fs = require("fs");
let text = fs.readFileSync('staging.json').toString()

//Require websockets to let the client and server communicate
let io = require('socket.io').listen(server)
io.on('connection', function (socket) {
  io.emit('open', text)
  socket.on('save', function (data) {
    update(data)
  })
  socket.on('close', function () {
    app.close()
  })
})

//Use file system to write to the json file
const update = data => {
  fs.writeFile("staging.json", data, (err) => {
    if (err) console.log('Writing error' + err)
  })
  console.log('Updating text.json file')
}