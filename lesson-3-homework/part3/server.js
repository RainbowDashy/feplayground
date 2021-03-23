const http = require("http")
const fs = require("fs")

const hostname = "127.0.0.1"
const port = 12345

const server = http.createServer((req, res) => {
    console.log(req)
    
    let rawdata = fs.readFileSync("1.json")
    let json = JSON.parse(rawdata);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.end(JSON.stringify(json))
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
})