require('dotenv').config();
const https = require('https');
const express = require('express');
const sessions = require('express-session');
const { engine } = require('express-handlebars');
const bodyParser = require('./middlewares/body_parser');
const flashMessage = require('./middlewares/flash_message');
const rateLimit = require('express-rate-limit');
const path = require("path")
const host = process.env.HOST;
const port = process.env.PORT;

const route = require('./routes')
const movieMiddleware = require('./Admin/middlewares/movieMiddleware');
const userMiddleware = require('./Admin/middlewares/userMiddleware');
const router = require('./Admin/routers/movieRouter');
const serviceMiddleware = require('./Admin/middlewares/serviceMiddleware');

const app = express();

//use handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
}));

app.use(express.static(path.join(__dirname, '/public')));

//limit rate
const apiLimiter = rateLimit({
    windowMs: 10 * 1000, // 10s
    max: 30,
    message: 'Too many connection',
});

app.use(sessions({
    secret: "my_secret_key",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

// Use middlewares 
app.use(bodyParser.urlencoded);
app.use(flashMessage);

//Admin
app.get('/Admin', (req, res) => {
    if (req.session.admin)
        res.redirect('http://localhost:3001/Admin');
    else
        res.redirect('/account/login');
});

//User
app.use('/', route)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { layout: "" });
});

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});