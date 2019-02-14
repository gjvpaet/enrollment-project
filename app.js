const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');

const app = express();

const userRoutes = require('./routes/users');
const enrollmentRoutes = require('./routes/enrollment');

mongoose.connect('mongodb://127.0.0.1/enrollment');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use('/api/users', userRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.locals.siteUrl = config.siteUrl;

app.get('*', (req, res, next) => {
    res.render('index', { title: 'Enrollment' });
});

app.use((req, res, next) => {
    const error = new Error('Not found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
