require('dotenv').config();
const axios = require("axios")
const dbClient = require('./db_client');
async function get(email) {
    const record = await dbClient.query(
        `SELECT * FROM account WHERE email = ?`,
        [email]
    );

    return record;
};

async function add(data){
    const record = await dbClient.query(
        `INSERT INTO account(name,password,email)
        values(?,?,?)`,[data.name, data.pwd, data.email]
    );

    return record;
}

async function getData(){
    var data = await axios.get(process.env.API_MOVIE+"&page=1")
    console.log(data.data.results.length)
    for(let i = 0; i<data.data.results.length; i++){
        var idPhim = data.data.results[i].id
        var tenPhim = data.data.results[i].original_title
        var time = await axios.get("https://api.themoviedb.org/3/movie/+"+idPhim+"?api_key=582118d727a442d47c146c982576a944")
        var thoiluong = time.data.runtime 
        var tomtat = data.data.results[i].overview
        var dinhdang = "2D"
        var video = await axios.get("https://api.themoviedb.org/3/movie/"+idPhim+"/videos?api_key=582118d727a442d47c146c982576a944")
        var trailer = "https://www.youtube.com/embed/" + video.data.results[0].key
        var poster = process.env.IMG_URL + data.data.results[i].backdrop_path
        var rating = data.data.results[i].vote_average
        var ngaykhoichieu = data.data.results[i].release_date
        
        const record = await dbClient.query(
            `INSERT INTO phim(MaPhim,TenPhim,ThoiLuong,TomTat,DinhDang,Trailer,Poster,Rating,NgayKhoiChieu)
            values(?,?,?,?,?,?,?,?,?)`,[idPhim,tenPhim,thoiluong,tomtat,dinhdang,trailer,poster,rating,ngaykhoichieu]
        );
    }
}
module.exports = {
    get, add, getData
}