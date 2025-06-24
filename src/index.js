import fs from 'fs';
import http from 'http';

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((request, response) => {
    const path = request.url.split('?')[0];
    let content = '';

    switch (path) {
    case '/':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        content = fs.readFileSync('client/index.html', 'utf8');
        console.log('HTTP', response.statusCode, request.url);
        break;
    case '/index.js':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/javascript');
        content = fs.readFileSync(`client${path}`, 'utf8');
        break;
    case '/main.css':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css');
        content = fs.readFileSync(`client${path}`, 'utf8');
        break;
    case '/404.jpg':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/jpeg');
        content = fs.readFileSync(`client/img${path}`);
        break;
    case '/img/favicon.ico':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/vnd');
        content = fs.readFileSync(`client/img${path}`);
        break;
    case '/img/apple-touch-icon.png':
    case '/img/favicon-16.png':
    case '/img/favicon-32.png':
    case '/img/favicon-192.png':
    case '/img/favicon-512.png':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/png');
        content = fs.readFileSync(`client${path}`);
        break;
    default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        content = fs.readFileSync('client/404.html', 'utf8');
        console.log('HTTP', response.statusCode, request.url);
        break;
    }

    response.setHeader('Content-Length', Buffer.byteLength(content));
    response.setHeader('Expires', new Date().toUTCString());
    response.end(content);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
