const db = require('../middlewares/db');

// Lấy danh sách phim từ cơ sở dữ liệu
const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM phim';
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


// Thêm phim vào cơ sở dữ liệu
const addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO phim (MaPhim, TenPhim, ThoiLuong, TomTat, DinhDang, Trailer, Poster, Rating, NgayKhoiChieu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [movie.MaPhim, movie.TenPhim, movie.ThoiLuong, movie.TomTat, movie.DinhDang, movie.Trailer, movie.Poster, movie.Rating, movie.NgayKhoiChieu];
        console.log(query);
        console.log(values);
        db.query(query, values, (error, result) => {
            console.log(result);
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
};


// Xóa phim khỏi cơ sở dữ liệu
const deleteMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM phim WHERE MaPhim = ${movieId}`;
        console.log(query);
        db.query(query, (error, result) => {
            console.log(result);
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
};

const getAllMoviesEdit = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM phim WHERE MaPhim = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('editMovie', { movie: result[0] });
    });
}


// const updateMovie = (movieId, movie) => {
//     return new Promise((resolve, reject) => {
//         const query = 'UPDATE phim SET ? WHERE MaPhim = ?';
//         console.log(query);
//         db.query(query, [movieId, movie], (error, result) => {
//             console.log(result);
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result.affectedRows);
//             }
//         });
//     });
// };

// CREATE TABLE `phim` (
//     `MaPhim` varchar(20) NOT NULL,
//     `TenPhim` varchar(30) NOT NULL,
//     `ThoiLuong` int(11) NOT NULL,
//     `TomTat` varchar(100) NOT NULL,
//     `DinhDang` char(5) NOT NULL,
//     `Trailer` varchar(200) NOT NULL,
//     `Poster` varchar(200) NOT NULL,
//     `Rating` float NOT NULL,
//     `NgayKhoiChieu` date NOT NULL
//   )

const updateMovie = (req, res) => {
    const id = req.params.id;
    const { MaPhim, TenPhim, ThoiLuong, TomTat, DinhDang, Trailer, Poster, Rating, NgayKhoiChieu } = req.body;
    console.log(MaPhim, TenPhim, ThoiLuong, TomTat, DinhDang, Trailer, Poster, Rating, NgayKhoiChieu)
    db.query('UPDATE phim SET TenPhim = ?, ThoiLuong = ?, TomTat = ?, DinhDang = ?, Trailer =?, Poster = ?, Rating = ?, NgayKhoiChieu = ? WHERE MaPhim = ?', [TenPhim, ThoiLuong, TomTat, DinhDang, Trailer, Poster, Rating, NgayKhoiChieu, MaPhim], (err, result) => {
        console.log(result)
        if (err) {
            console.log(err);
        }
        res.redirect('/Movie');
    });
}


module.exports = {
    getAllMovies,
    addMovie,
    deleteMovie,
    getAllMoviesEdit,
    updateMovie
};