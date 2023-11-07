// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


// MENDAPATKAN RESPON DATA //

// const http = require('http');
// const todos = [
//     {id : 1, text: 'Todo One'},
//     {id : 2, text: 'Todo Two'},
//     {id : 3, text: 'Todo Three'},
// ];

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

// const data = JSON.stringify({
//     success: true,
//     data: todos,
// });

// res.end(data);
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// STATUS CODE //

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

// const data = JSON.stringify({
//     success: false,
//     error: 'Not Found',
//     data: null,
// });

// res.end(data);
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Server runing on port ${port}`)});

// STATUS CODE 2 //

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     res.writeHead(404, {
//         'Content-Type': 'application/json',
//         'X-Powered-By': 'Node.js',
//     });

// const data = JSON.stringify({
//     success: false,
//     error: 'Not Found',
//     data: null,
// });

// res.end(data);
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Server runing on port ${port}`)});

// MENGIRIMKAN DATA KE SERVER //

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     res.writeHead(404, {
//         'Content-Type': 'application/json',
//         'X-Powered-By': 'Node.js',
//     });

//     let body = [];

//     req 
//     .on ('data', chunk =>{
//         body.push(chunk);
//     })
//     .on ('end', () =>{
//         body = Buffer.concat(body).toString();
//         console.log(body);
//     });

// const data = JSON.stringify({
//     success: true,
//     error: 'Not Found',
//     data: null,
// });

// res.end(data);
// });

// const port = 3000;

// server.listen(port, () => {
//   console.log(`Server runing on port ${port}`)});

// GET DAN POST //

const http = require('http');

const todos = [
    {id : 1, text: 'Todo One'},
    {id : 2, text: 'Todo Two'},
    {id : 3, text: 'Todo Three'},
];

const server = http.createServer((req, res) => {
    // listening data from client 
    const {method, url} = req;
    let body = [];

    req.on ('data', chunk =>{
            body.push(chunk);
        }).on ('end', () =>{
            body = Buffer.concat(body).toString();

            let status = 404;
            const response = {
                success: false,
                result: [],
                error: ''
            };

            if (method === 'GET' && url === '/todos') {

                status = 200;
                response.success = true;
                response.result = todos;

            } else if (method === 'POST' && url === '/todos') {

                const { id, text} = JSON.parse(body);

                if (!id || !text) {
                    status = 400;
                    response.error = 'Please add id and text';
                } else {
                    todos.push({id, text});
                    status = 201;
                    response.success = true;
                    response.result = todos;
                }
            }

            res.writeHead(status, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'Node.js'
            });

            res.end(JSON.stringify(response));
        });

});

const port = 3000;

server.listen(port, () => {console.log(`Example app listening on port ${port}`)});
