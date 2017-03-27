'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const debug = require('debug')('axilisserver:server');
const http = require('http');

const indexRoutes = require('./routes/index.routes');
const usersRoutes = require('./routes/userLogin');
const userRegisterRoutes = require('./routes/userRegister');
const scheduleRoutes = require('./routes/schedule.routes');
const eventsRoutes = require('./routes/events.routes');

const app = express();

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));


// define routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoutes);
//app.use('/schedule', scheduleRoutes);
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);
app.use('/events/:eventId/schedule', scheduleRoutes);

//baza
const mongoose = require('mongoose');
// mongoose.connect('mongodb://member:iosappmember@ds141450.mlab.com:41450/iosapp',
//     (err) => {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('Uspjesno spojeni na bazu!');
//     });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('Listening on port: ' + port + '...');

//
// app.get('/userLogin', usersRoutes.get);
// app.post('/userLogin', usersRoutes.post);
// app.post('/userRegister', userRegisterRoutes.post);
// app.get('/schedule', scheduleRoutes.get);

