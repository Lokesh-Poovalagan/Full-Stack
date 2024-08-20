const fs = require('fs');
const port = 3000;
const filePath = './data.json';
const http = require('http')
const server = http.createServer((req,res) => {
    if(req.method === 'GET'){
        try {
   
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(jsonData))
            return;
        } catch (err) {
            console.error('Error reading or parsing the file:', err);
        }
    }
})

server.listen(port,() => {
    console.log(`server running on ${port}`);``
})