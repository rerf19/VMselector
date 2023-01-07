const http = require('http')
const port = 8080

// Create a server object:
const server = http.createServer(function (req, res) {
})

// Set up our server so it will listen on the port
server.listen(port, function (error) {
    console.log("Server Running...");
})