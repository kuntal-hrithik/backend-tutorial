const { log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
//blocking synchronus way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `this is what we know about avacado: ${textIn}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('file written');

//non-blocking Async

// fs.readFile('./txt/start.txt',"utf-8",(err,data1)=>{
// console.log(data1);
// fs.readFile(`./txt/${data1}.txt`,"utf-8",(err,data2)=>{
// console.log(data2);
// fs.readFile('./txt/append.txt',"utf-8",(err,data3)=>{
// console.log(data3);

// fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//     console.log('your file has been written');
// })
// })
// })
// })
// console.log('will read this');

////////////////
//Server
const server = http.createServer((req,res)=>{
    console.log(req.url);
    const pathName = req.url;
    if(pathName == '/'||pathName == '/overview'){
        res.end('this is overview');
    }else if(pathName == '/product'){
        res.end('this is a product');
    }else if(pathName == '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
            res.writeHead(200,{
                'Content-type':'application/json'
            })
            const product = JSON.parse(data);
            res.end(data);
        })
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>Page not found</h1>');
    }
});



server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to req int the port');
});



