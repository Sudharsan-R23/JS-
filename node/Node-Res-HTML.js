const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res)=>{

    let path = './Pages/';

    if(req.url == '/' || req.url == '/home'){
        path+= 'index.html';
        res.statusCode = 200;
    }
    else if(req.url == '/about'){
        path+= 'about.html';
        res.statusCode = 200;
    }
    else{
        path+= '404.html';
        res.statusCode = 404;
    }

    fs.readFile(path, (err, data)=>{

        if(err){
            console.log(err.message);
            res.end();
        }
        else{
            res.setHeader('Contant-type', 'text/html');
            res.end(data);

        }
    })

});

server.listen(3000, 'localhost',()=>{
    console.log('Request Made!...');
});