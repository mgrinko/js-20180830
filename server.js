let http = require('http');
let static = require('node-static');
let file = new static.Server('.');

http.createServer((req, res) => {
  file.serve(req, res);
}).listen(8080);

console.log("---", "Server is running on port 8080");