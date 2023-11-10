const Movie = require('../models/movie');

// Hiển thị danh sách phim
const getAllMovies = (req, res) => {
    Movie.getAllMovies()
        .then(movie => {
            res.render('movie', { movie });
        })
        .catch(error => {
            res.status(500).send('Lỗi trong quá trình lấy dữ liệu phim');
        });
};

const addMoviePage = (req, res) => {
    res.render('addMovie');
};

const addMovie = (req, res) => {
    const movie = req.body;
    console.log(movie);
    Movie.addMovie(movie)
        .then(insertId => {
            res.redirect('/movie');
        })
        .catch(error => {
            res.status(500).send('Lỗi trong quá trình thêm phim');
        });
};


// Xóa phim
const deleteMovie = (req, res) => {
    const movieId = req.params.id;
    Movie.deleteMovie(movieId)
        .then(affectedRows => {
            res.redirect('/movie');
        })
        .catch(error => {
            res.status(500).send('Lỗi trong quá trình xóa phim');
        });
};

const getAllMoviesEdit = (req, res) => {
    Movie.getAllMoviesEdit(req, res);
}

// const updateMovie = (req, res) => {
//     const movieId = req.params.id;
//     const movie = req.body;
//     Movie.updateMovie(movieId, movie)
//         .then(affectedRows => {
//             res.redirect('/movie');
//         })
//         .catch(error => {
//             res.status(500).send('Lỗi trong quá trình cập nhật phim');
//         });
// };

const updateMovie = (req, res) => {
    Movie.updateMovie(req, res);
}


module.exports = {
    getAllMovies,
    addMoviePage,
    addMovie,
    deleteMovie,
    getAllMoviesEdit,
    updateMovie
};