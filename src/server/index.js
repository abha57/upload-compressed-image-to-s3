const http = require('http');
import app from 'app';

const server = http.createServer(app);

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || '8080');

app.set('port', port);

const onListen = () => {
    console.log(`server listening on port ${server.address().port}.`);
}

const onError = (error) => {
    switch(error.code) {
        case 'EACCESS': 
            console.log(`${port} requires elevated privileges.`)
            process.exit(1);
            break;
        case 'EADDRINUSE': 
            console.log(`${port} is already in use.`)
            process.exit(1);
            break;
        default:
            throw error;
    }
}

server.listen(port);

server.on('error', onError);
server.on('listening', onListen);

process.on('uncaughtException', function() {
    console.log(`uncaughtException at ${server.getAddress().port}`)
})