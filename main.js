const http = require('http')
const port = 8080

//server object
const server = http.createServer(function (req, res) {
})

// listen the port
server.listen(port, function (error) {
    console.log("Server Running...");
})