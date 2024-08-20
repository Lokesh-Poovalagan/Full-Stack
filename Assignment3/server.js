const http=require('http')
const port=3000
const fs= require('fs')
const { log } = require('console')

const server=http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html',(error,data)=>{
        res.write(data)
        res.end()
    })
})

server.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Server is running");
    }
})