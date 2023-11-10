const express = require('express');
const bodyParser = require('body-parser');
const movieMiddleware = require('./middlewares/movieMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');
const serviceMiddleware = require('./middlewares/serviceMiddleware');
const premiereMiddleware = require('./middlewares/premiereMiddleware');
const revenueMiddleware = require('./middlewares/revenueMiddleware');
const router = require('./routers/movieRouter');
const https = require('https');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));



app.get('/Admin', (req, res) => {
    res.render('home');
});

app.get('/Movie', movieMiddleware.getAllMovies);
app.get('/Movie/add', movieMiddleware.addMoviePage);
app.post('/Movie/add', movieMiddleware.addMovie);
app.get('/Movie/delete/:id', movieMiddleware.deleteMovie);
app.get('/Movie/edit/:id', movieMiddleware.getAllMoviesEdit);
app.post('/Movie/edit', movieMiddleware.updateMovie);
//Đường dẫn đến trang edit.ejs để cập nhật phim

app.get('/Genre', (req, res) => {
    //https://api.themoviedb.org/3/genre/movie/list?language=vi-VI&api_key=582118d727a442d47c146c982576a944    
    const options = {
        hostname: 'api.themoviedb.org',
        path: '/3/genre/movie/list?language=vi-VI&api_key=582118d727a442d47c146c982576a944',
        port: 443,
        method: 'GET'
    }
    const request = https.request(options, response => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        })
        response.on('end', () => {
            const genre = JSON.parse(data);
            res.render('genre', { genre: genre.genres });
        })

        response.on('error', e => console.error(e))
    });

    request.on('error', error => {
        console.error(error)
    })
    request.end();
});


app.get('/User', userMiddleware.getAllUsers);
app.post('/User/add', userMiddleware.addUser);
app.get('/User/delete/:id', userMiddleware.deleteUser);
app.get('/User/edit/:id', userMiddleware.getAllUserEdit);
app.post('/User/edit', userMiddleware.updateUser);


app.get('/service', serviceMiddleware.getAllServices);
app.post('/service/add', serviceMiddleware.addService);
app.get('/service/delete/:id', serviceMiddleware.deleteService);
app.get('/service/edit/:id', serviceMiddleware.getAllServiceEdit);
app.post('/service/edit', serviceMiddleware.updateService);

app.get('/premiere', premiereMiddleware.getAllPremiere);
app.get('/premiere/add', premiereMiddleware.addPremierePage);
app.post('/premiere/add', premiereMiddleware.addPremiere);
app.get('/premiere/edit/:id', premiereMiddleware.getAllPremiereEdit);
app.post('/premiere/edit', premiereMiddleware.updatePremiere);

app.get('/revenue', revenueMiddleware.getAllRevenue);

app.listen(3001, () => {
    console.log('Server is running on port 3000');
});